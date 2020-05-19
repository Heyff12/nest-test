import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {

  private numUsers: number = 0;
  private userName: string = '';
  private usersName: string[] = [];
  private addedUser:boolean = false;


  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data)
    return data;
  }

  @SubscribeMessage('add user')
  addUser(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):Observable<WsResponse<unknown>> {
    console.log('-------add user----------------------------------------------------------------')
    console.log(data)
    console.log(this.addedUser)

    const username = data

    // if (this.addedUser) return;
    console.log('usersName', this.usersName)

    const validName = this.usersName.includes(username)
    console.log('validName', validName)

    let events:any = [{
      events:'valid name',
      data: {
        result: !validName,
        type: 'repeat'
      }
    }]

    if(validName){
      const result = from(events).pipe(map(({events,data}) => ({ event: events, data: data })));
      return result
      // this.server.emit('valid name', {
      //   result: false,
      //   type: 'repeat'
      // });

    }


    this.usersName.push(username)
    this.userName = username
    ++this.numUsers
    // this.addedUser = true;
    events.push({
      events: 'login',
      data: {
        numUsers: this.numUsers
      }
    })
    const result = from(events).pipe(map(({events,data}) => ({ event: events, data: data })));
    return result
    
     
    // //只发送给当前客户端
    // socket.emit('login', {
    //   numUsers: numUsers
    // });
    // //发送给除当前客户端外的所有客户端
    // socket.broadcast.emit('user joined',{
    //   username: socket.username,
    //   numUsers: numUsers
    // })
  }


}
