// export class CreateCatDto {
//     readonly name: string;
//     readonly age: number;
//     readonly breed: string;
//   }

  import { IsString, IsInt, IsBoolean } from 'class-validator';

  export class CreateCatDto {
    @IsString()
    readonly name: string;
  
    @IsInt()
    readonly age: number;
  
    @IsBoolean()
    readonly breed: boolean;
  }

  