import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDTO {
  @IsNotEmpty()
  @IsISO8601()
  dateStart: Date;

  // YYYY-MM-DD hh:mm:ssZ () 2022-07-16 02:30:00Z
  @IsNotEmpty()
  @IsISO8601()
  dateEnd: Date;

  @IsNotEmpty()
  @IsString()
  courseType: string;

  @IsString()
  room: string;

  @IsString()
  linkClass: string;

  @IsNotEmpty()
  @IsNumber()
  classCapacity: number;

  @IsNotEmpty()
  @IsString()
  mentorId: string;
}
