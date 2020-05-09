// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }


import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
let num = 1

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(configService: ConfigService) {
    this.helloMessage = configService.get('HELLO_MESSAGE');
  }

  @Cron('45 * * * * *')
  getHello(): string {
    return this.helloMessage + num++;
  }
}
