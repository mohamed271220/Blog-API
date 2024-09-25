import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.entity';
import { UserRole } from 'src/user/entities/user-role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Op } from 'sequelize';
import { getPagination } from 'src/shared/utils/pagination';
import { EditRoleDto } from './dto/edit-role.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create({
      id: uuid(),
      name: createRoleDto.name,
    });
  }

  async getAllRoles(search: string, limit: number, offset: number) {
    const { count, rows } = await this.roleModel.findAndCountAll({
      raw: true,
      nest: true,
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      limit,
      offset,
    });

    const pagination = getPagination(count, limit, offset);
    return { roles: rows, pagination };
  }

  async getRoleById(roleId: string) {
    return await this.roleModel.findByPk(roleId);
  }

  async updateRole(roleId: string, editRoleDto: EditRoleDto) {
    const role = await this.roleModel.findByPk(roleId);
    return await role.update(editRoleDto);
  }

  async deleteRole(roleId: string) {
    return await this.roleModel.destroy({ where: { id: roleId } });
  }
}
