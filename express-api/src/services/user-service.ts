import { Op } from "sequelize";
import Role from "../models/role";
import User from "../models/user";
import UserRole from "../models/userRole";
import { CustomError } from "../utils/CustomError";
import { getPagination } from "../utils/pagination";

export class UserService {
  constructor(
    private userRepository: typeof User = User,
    private roleRepository: typeof Role = Role,
    private userRoleRepository: typeof UserRole = UserRole
  ) {}

  async getUsers(limit: number, offset: number, querySearch: string) {
    const whereClause = querySearch
      ? {
          [Op.or]: [
            { username: { [Op.iLike]: `%${querySearch}%` } },
            { email: { [Op.iLike]: `%${querySearch}%` } },
          ],
        }
      : {};
    const { count, rows: users } =
      await this.userRoleRepository.findAndCountAll({
        limit,
        offset,
        where: whereClause,
        include: [
          {
            model: this.userRepository,
            attributes: { exclude: ["password"] },
          },
          { model: this.roleRepository },
        ],
      });

    const pagination = getPagination(count, limit, offset);
    return { users, pagination };
  }

  async getUser(id: string) {
    return this.userRepository.findOne({
      where: { id },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: this.roleRepository,
        },
      ],
    });
  }

  async updateUser(id: string, data: { username: string; email: string }) {
    return this.userRepository.update(data, { where: { id } });
  }

  async deleteUser(id: string) {
    return this.userRepository.destroy({ where: { id } });
  }

  async addNewRoleToUser(id: string, roleId: string) {
    console.log(id);

    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const role = await this.roleRepository.findByPk(roleId);
    if (!role) {
      throw new CustomError("Role not found", 404);
    }
    const userRole = await this.userRoleRepository.findOne({
      where: { userId: id, roleId },
    });
    if (userRole) {
      throw new CustomError("User role already exists", 404);
    }
    return this.userRoleRepository.create({ roleId, userId: id });
  }
}
