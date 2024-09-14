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
const roleController = __importStar(require("../controllers/role-controller"));
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), roleController.createRole);
router.get("/", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin", "admin"), roleController.getRoles);
router.get("/:roleId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin", "admin"), roleController.getRole);
router.put("/:roleId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), roleController.updateRole);
router.delete("/:roleId", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)("superadmin"), roleController.deleteRole);
exports.default = router;
