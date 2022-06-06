import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAnnouncementDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  detail?: string;
}
