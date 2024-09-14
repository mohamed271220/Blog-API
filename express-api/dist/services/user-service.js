"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const sequelize_1 = require("sequelize");
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const userRole_1 = __importDefault(require("../models/userRole"));
const CustomError_1 = require("../utils/CustomError");
const pagination_1 = require("../utils/pagination");
class UserService {
    constructor(userRepository = user_1.default, roleRepository = role_1.default, userRoleRepository = userRole_1.default) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }
    getUsers(limit, offset, querySearch) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = querySearch
                ? {
                    [sequelize_1.Op.or]: [
                        { username: { [sequelize_1.Op.iLike]: `%${querySearch}%` } },
                        { email: { [sequelize_1.Op.iLike]: `%${querySearch}%` } },
                    ],
                }
                : {};
            const { count, rows: users } = yield this.userRoleRepository.findAndCountAll({
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
            const pagination = (0, pagination_1.getPagination)(count, limit, offset);
            return { users, pagination };
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({
                where: { id },
                attributes: ["id", "username", "email"],
                include: [
                    {
                        model: this.roleRepository,
                    },
                ],
            });
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.update(data, { where: { id } });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.destroy({ where: { id } });
        });
    }
    addNewRoleToUser(id, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const user = yield this.userRepository.findByPk(id);
            if (!user) {
                throw new CustomError_1.CustomError("User not found", 404);
            }
            const role = yield this.roleRepository.findByPk(roleId);
            if (!role) {
                throw new CustomError_1.CustomError("Role not found", 404);
            }
            const userRole = yield this.userRoleRepository.findOne({
                where: { userId: id, roleId },
            });
            if (userRole) {
                throw new CustomError_1.CustomError("User role already exists", 404);
            }
            return this.userRoleRepository.create({ roleId, userId: id });
        });
    }
}
exports.UserService = UserService;
