import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsMongoResolvers } from './catsMongo.resolvers';
import { CatsMongoService } from './catsMongo.service';
import { CatSchema } from './schemas/cat.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])
  ],
  controllers: [],
  providers: [CatsMongoService,CatsMongoResolvers],
  exports: [CatsMongoService,CatsMongoResolvers]
})
export class CatsMongoModule {}