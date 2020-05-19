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
  private usersName: string[] = [];


  @WebSocketServer()
  server: Server;

  @SubscribeMessage('add user')
  addUser(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):WsResponse<unknown> {
    console.log('-------add user----------------------------------------------------------------')
    console.log(data)
    console.log("client['addedUser']", client['addedUser'])

    const username = data

    if (client['addedUser']) return;
    console.log('usersName', this.usersName)

    const validName = this.usersName.includes(username)
    console.log('validName', validName)

    if(validName){
      client.emit('valid name', {
        result: false,
        type: 'repeat'
      });
      return
    }

    client.emit('valid name', {
      result: true
    });


    this.usersName.push(username)
    client['username'] = username
    ++this.numUsers
    client['addedUser'] = true
    //只发送给当前客户端
    client.emit('login', {
      numUsers: this.numUsers
    })
    //发送给除当前客户端外的所有客户端
    client.broadcast.emit('user joined', {
      username: username,
      numUsers: this.numUsers
    })

    client.on('disconnect', () => {
      console.log('-------disconnect-----------------------------------------------------------------')
    
      if (client['addedUser']) {
        --this.numUsers;
        this.usersName = this.usersName.filter(name=>name!==client['username'])

        // echo globally that this client has left
        client.broadcast.emit('user left', {
          username: client['username'],
          numUsers: this.numUsers
        });
      }
    });
    return
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):WsResponse<unknown> {
    console.log('-------typing-----------------------------------------------------------------')

    client.broadcast.emit('typing', {
      username: client['username']
    });
    return
  }

  @SubscribeMessage('stop typing')
  stopTyping(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):WsResponse<unknown> {
    console.log('-------stop typing-----------------------------------------------------------------')

    client.broadcast.emit('stop typing', {
      username: client['username']
    });
    return
  }

  @SubscribeMessage('new message')
  newMessage(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):WsResponse<unknown> {
    console.log('-------new message-----------------------------------------------------------------')

    client.broadcast.emit('new message', {
      username: client['username'],
      message: data
    });
    return
  }

  @SubscribeMessage('disconnect')
  disconnect(
    @MessageBody() data: any, 
    @ConnectedSocket() client: Socket
  ):WsResponse<unknown> {
    console.log('-------disconnect-----------------------------------------------------------------')
    

    if (client['addedUser']) {
      --this.numUsers;
      this.usersName = this.usersName.filter(name=>name!==client['username'])

      // echo globally that this client has left
      client.broadcast.emit('user left', {
        username: client['username'],
        numUsers: this.numUsers
      });
    }
    return
  }


}
