import { IsNotEmpty, IsString } from 'class-validator';

export class AddStudentDTO {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
