import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Tag } from './tag.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Tag]), AuthModule],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
