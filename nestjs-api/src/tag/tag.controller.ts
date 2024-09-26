import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('api/v1/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superadmin')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Get('/')
  async getTags(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.tagService.getTags(
      limit ? Number(limit) : 10,
      offset ? Number(offset) : 0,
    );
  }

  @Get('/:tagId')
  async getTagById(@Param('tagId') tagId: string) {
    return this.tagService.getTagById(tagId);
  }

  @Put('/:tagId/name')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superadmin')
  async updateTag(
    @Param('tagId') tagId: string,
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.tagService.updateTag(tagId, createTagDto);
  }

  @Delete('/:tagId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  async deleteTag(@Param('tagId') tagId: string) {
    return this.tagService.deleteTag(tagId);
  }
}
