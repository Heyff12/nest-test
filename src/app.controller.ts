import { Controller, Get, Request, Post, UseGuards, Render} from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
// import {LocalAuthGuard} from './auth/study/local-auth.guard'
import { AuthService } from './auth/auth.service';


import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}
  

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
    return { message: this.appService.getHello() };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}

//curl -X POST http://localhost:3001/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
// curl http://localhost:3001/profile
// curl http://localhost:3001/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU4OTAzMDMwMCwiZXhwIjoxNTg5MDMwMzYwfQ.nJ1Bj9loS64FuYPDM2CmNC_eoLE6QmMAhpIiYdFaU20"