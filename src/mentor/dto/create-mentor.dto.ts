import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMentorDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  teachingMethod: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;
}
