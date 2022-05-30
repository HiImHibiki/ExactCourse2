import { Module } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';

@Module({
  providers: [ProfilePictureService],
  controllers: [ProfilePictureController]
})
export class ProfilePictureModule {}
