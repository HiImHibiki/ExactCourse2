import { IsNotEmpty, IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
