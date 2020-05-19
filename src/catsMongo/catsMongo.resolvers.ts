
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsMongoService } from './catsMongo.service';
import { CatMongo } from '../graphql.schema';


@Resolver('catsMongo')
export class CatsMongoResolvers {
  constructor(private readonly catsMongoService: CatsMongoService) {}

  @Query()
  async getCatsMongo(): Promise<CatMongo[]> {
    console.log(this.catsMongoService.findAll());
    return this.catsMongoService.findAll();
  }

  @Mutation('createCatMongo')
  async createCatMongo(@Args('createCatMongoInput') args: CreateCatDto) {
    await this.catsMongoService.create(args);
  }
}
