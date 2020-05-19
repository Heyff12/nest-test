// export interface Cat {
//     name: string;
//     age: number;
//     breed: boolean;
//   }

import { Document } from 'mongoose';

export interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: boolean;
}
