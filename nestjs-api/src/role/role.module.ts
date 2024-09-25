import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.entity';
import { UserRole } from '../user/entities/user-role.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Role, UserRole]), AuthModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
