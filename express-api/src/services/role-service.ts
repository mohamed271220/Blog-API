import Role from "../models/role";
import { v4 as uuid } from "uuid";
import { getPagination } from "../utils/pagination";

export class RoleService {
  constructor(private roleRepository: typeof Role = Role) {}

  async createRole(data: { name: string }) {
    return this.roleRepository.create({ id: uuid(), name: data.name });
  }

  async getRoles(limit: number, offset: number, querySearch: string) {
    const whereClause = querySearch
      ? { name: { $iLike: `%${querySearch}%` } }
      : {};
    const { count, rows: roles } = await this.roleRepository.findAndCountAll({
      limit,
      offset,
      where: whereClause,
    });
    const pagination = getPagination(count, limit, offset);
    return { roles, pagination };
  }

  async getRole(id: string) {
    return this.roleRepository.findByPk(id);
  }

  async updateRole(id: string, data: { name: string }) {
    return this.roleRepository.update({ name: data.name }, { where: { id } });
  }

  async deleteRole(id: string) {
    return this.roleRepository.destroy({ where: { id } });
  }
}
