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
exports.deleteUser = exports.updateUser = exports.addNewRoleToUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user-service");
const userService = new user_service_1.UserService();
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const querySearch = req.query.search ? req.query.search : "";
        const { users, pagination } = yield userService.getUsers(limit, offset, querySearch);
        res
            .status(200)
            .json({ message: "fetched users successfully", users, pagination });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userService.getUser(userId);
        res.status(200).json({
            message: "fetched user successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const addNewRoleToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const roleId = req.body.roleId;
        yield userService.addNewRoleToUser(userId, roleId);
        res.status(200).json({ message: "User role updated" });
    }
    catch (error) {
        next(error);
    }
});
exports.addNewRoleToUser = addNewRoleToUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const data = req.body;
        yield userService.updateUser(userId, data);
        res.status(200).json({ message: "User updated" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield userService.deleteUser(userId);
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
