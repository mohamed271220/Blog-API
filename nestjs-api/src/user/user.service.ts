import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { getPagination } from 'src/shared/utils/pagination';
import { Op } from 'sequelize';
import { Role } from 'src/role/role.entity';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async getAllUsers(search: string, limit: number, offset: number) {
    const { count, rows } = await this.userModel.findAndCountAll({
      raw: true,
      nest: true,
      where: {
        username: {
          [Op.iLike]: `%${search}%`,
        },
      },
      limit,
      offset,
    });

    const pagination = getPagination(count, limit, offset);
    return { users: rows, pagination };
  }

  async getUserById(userId: string) {
    return await this.userModel.findByPk(userId);
  }

  async assignRoleToUser(userId: string, roleId: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const userRole = await this.userRoleModel.findOne({
      where: { userId: userId, roleId },
    });
    if (userRole) {
      throw new NotFoundException('User role already exists');
    }
    return await this.userRoleModel.create({
      userId,
      roleId,
    });
  }

  async updateUser(userId: string, editUserDto: EditUserDto) {
    const user = await this.userModel.findByPk(userId);
    return await user.update(editUserDto);
  }

  async deleteUser(userId: string) {
    return await this.userModel.destroy({ where: { id: userId } });
  }
}
