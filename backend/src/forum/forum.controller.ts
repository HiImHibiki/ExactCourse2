import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreateForumDTO } from './dto/create-forum.dto';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async postForum(@Body() data: CreateForumDTO, @User() user) {
    return await this.forumService.postForum(data, user);
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
    @User() user,
  ) {
    return await this.forumService.postComment(data, id, user);
  }
}
