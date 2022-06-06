import { IsNotEmpty, IsString } from 'class-validator';

export class CreateForumDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
