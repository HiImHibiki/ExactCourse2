import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  message: string;
}
