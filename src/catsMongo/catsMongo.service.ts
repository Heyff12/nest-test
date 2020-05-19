import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}

// @Injectable()
// export class CatsService {
//   private readonly cats: Cat[] = [{ breed: '1', name: 'Cat', age: 5 }];

//   create(cat: Cat) {
//     this.cats.push(cat);
//   }

//   findAll(): Cat[] {
//     return this.cats;
//   }
// }