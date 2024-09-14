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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRole = exports.getRoles = void 0;
const role_service_1 = require("../services/role-service");
const roleService = new role_service_1.RoleService();
const getRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const querySearch = req.query.search ? req.query.search : "";
        const { roles, pagination } = yield roleService.getRoles(limit, offset, querySearch);
        res
            .status(200)
            .json({ message: "fetched roles successfully", roles, pagination });
    }
    catch (error) {
        next(error);
    }
});
exports.getRoles = getRoles;
const getRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId } = req.params;
        const role = yield roleService.getRole(roleId);
        res.status(200).json({ message: "fetched role successfully", role });
    }
    catch (error) {
        next(error);
    }
});
exports.getRole = getRole;
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield roleService.createRole(req.body);
        res.status(201).json({ message: "role created successfully", role });
    }
    catch (error) {
        next(error);
    }
});
exports.createRole = createRole;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId } = req.params;
        const role = yield roleService.updateRole(roleId, req.body);
        res.status(200).json({ message: "role updated successfully", role });
    }
    catch (error) {
        next(error);
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId } = req.params;
        yield roleService.deleteRole(roleId);
        res.status(200).json({ message: "role deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRole = deleteRole;
