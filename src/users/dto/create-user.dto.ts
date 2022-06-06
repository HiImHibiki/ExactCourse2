import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsISO8601,
  IsEnum,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phoneNumber: string; // +6281234567890

  @IsNotEmpty()
  @IsISO8601()
  birthday: Date; // YYYY-MM-DD

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender; // MALE | FEMALE
}
