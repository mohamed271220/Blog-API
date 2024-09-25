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
import { RoleService } from './role.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';

@Controller('api/v1/roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles('superadmin')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  @Roles('superadmin', 'admin')
  async getAllRoles(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.roleService.getAllRoles(
      search ? search : '',
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/:roleId')
  @Roles('superadmin', 'admin')
  async getRoleById(@Param('roleId') roleId: string) {
    return this.roleService.getRoleById(roleId);
  }

  @Put('/:roleId')
  @Roles('superadmin')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() editRoleDto: EditRoleDto,
  ) {
    return this.roleService.updateRole(roleId, editRoleDto);
  }

  @Delete('/:roleId')
  @Roles('superadmin')
  async deleteRole(@Param('roleId') roleId: string) {
    return this.roleService.deleteRole(roleId);
  }
}
