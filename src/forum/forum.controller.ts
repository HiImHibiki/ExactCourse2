import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Student } from 'src/common/decorators/student.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreateForumDTO } from './dto/create-forum.dto';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async postForum(@Body() data: CreateForumDTO, @Student() student) {
    return await this.forumService.postForum(data, student);
  }

  @Get()
  async getAllForums() {
    return await this.forumService.getAllForum();
  }

  @Get(':id')
  async getForumById(@Param('id') id: string) {
    return await this.forumService.getForumById(id);
  }

  @Post(':id')
  async postComment(
    @Body() data: CreateCommentDTO,
    @Param('id') id: string,
    @Student() student,
  ) {
    return await this.forumService.postComment(data, id, student);
  }
}
