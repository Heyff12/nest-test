import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsMongoController } from './catsMongo.controller';
import { CatsMongoService } from './catsMongo.service';
import { CatSchema } from './schemas/cat.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])
  ],
  controllers: [CatsMongoController],
  providers: [CatsMongoService],
  exports: [CatsMongoService]
})
export class CatsMongoModule {}