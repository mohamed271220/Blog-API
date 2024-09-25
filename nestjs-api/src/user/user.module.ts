import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/role/role.entity';
import { UserController } from './user.controller';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, Role]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
