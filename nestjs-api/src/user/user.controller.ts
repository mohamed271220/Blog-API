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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('superadmin', 'admin')
  getAllUsers(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.userService.getAllUsers(
      search ? search : '',
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/:userId')
  @Roles('superadmin', 'admin')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('/:userId/assign-role/:roleId')
  @Roles('superadmin')
  assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.assignRoleToUser(userId, roleId);
  }

  @Put('/:userId')
  @Roles('superadmin')
  updateUser(
    @Param('userId') userId: string,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.userService.updateUser(userId, editUserDto);
  }

  @Delete('/:userId')
  @Roles('superadmin')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
