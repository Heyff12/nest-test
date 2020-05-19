import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './catsMongo.controller';
import { CatsService } from './catsMongo.service';
import { CatSchema } from './schemas/cat.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsMongoModule {}