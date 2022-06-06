import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddAttendanceDTO {
  @IsNotEmpty()
  @IsNumber()
  attendanceQty: number;
}
