"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = authorizeRoles;
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // If user.roles is an array, check if any of the allowed roles match
        const userRoles = user.roles; // This should be an array if user can have multiple roles
        if (!userRoles.some(role => allowedRoles.includes(role))) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}
