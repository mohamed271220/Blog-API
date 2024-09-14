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
exports.RoleService = void 0;
const role_1 = __importDefault(require("../models/role"));
const uuid_1 = require("uuid");
const pagination_1 = require("../utils/pagination");
class RoleService {
    constructor(roleRepository = role_1.default) {
        this.roleRepository = roleRepository;
    }
    createRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.create({ id: (0, uuid_1.v4)(), name: data.name });
        });
    }
    getRoles(limit, offset, querySearch) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = querySearch
                ? { name: { $iLike: `%${querySearch}%` } }
                : {};
            const { count, rows: roles } = yield this.roleRepository.findAndCountAll({
                limit,
                offset,
                where: whereClause,
            });
            const pagination = (0, pagination_1.getPagination)(count, limit, offset);
            return { roles, pagination };
        });
    }
    getRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.findByPk(id);
        });
    }
    updateRole(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.update({ name: data.name }, { where: { id } });
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.destroy({ where: { id } });
        });
    }
}
exports.RoleService = RoleService;
