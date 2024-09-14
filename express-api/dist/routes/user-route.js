"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const role_middleware_1 = require("../middleware/role-middleware");
const userController = __importStar(require("../controllers/user-controller"));
const router = express_1.default.Router();
// get all users with their roles
router.get("/", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin", "admin"), userController.getUsers);
// get roles of a user
router.get("/:userId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin", "admin"), userController.getUser);
// add an user role by id
router.post("/:userId/role", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), userController.addNewRoleToUser);
// update user's (email and username) by id
router.put("/:userId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), userController.updateUser);
// delete user by id
router.delete("/:userId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), userController.deleteUser);
exports.default = router;
