import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ProfilePictureService } from './profile-picture.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image')) {
          return callback(new BadRequestException('File harus image'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
      },
    }),
  )
  async saveFile(
    @User('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profilePicture = await this.profilePictureService.saveFile(userId, {
      name: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
    });
    return profilePicture;
  }

  @Public()
  @Get(':id')
  async getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.profilePictureService.getFile(id);
    const absoluteFilePath = join(process.cwd(), file.path);
    const stream = createReadStream(absoluteFilePath);

    res.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `inline; filename=${file.name}`,
    });

    return new StreamableFile(stream);
  }
}
