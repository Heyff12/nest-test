import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/exception/forbidden.exception';
import { HttpExceptionFilter } from '../common/exception/http-exception.filter';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  //   @Get()
  //   findAll(@Req() request: Request): string {
  //     return 'This action returns all cats';
  //   }

  @Get('/forbidden')
  @UseFilters(new HttpExceptionFilter())
  async forbidden() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('/forbidden1')
  async forbidden1() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      403,
    );
  }

  @Get('/forbidden2')
  async forbidden2() {
    throw new ForbiddenException();
  }

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    console.log(this.catsService.findAll());
    return this.catsService.findAll();
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    // return 'This action adds a new cat';
    await this.catsService.create(createCatDto);
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a #${id} cat`;
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //     console.log(params.id);
  //     return `This action returns a #${params.id} cat`;
  // }
}
