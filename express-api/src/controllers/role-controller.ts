import { NextFunction } from "express";

import { Request, Response } from "express";
import { RoleService } from "../services/role-service";

const roleService = new RoleService();

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const querySearch = req.query.search ? (req.query.search as string) : "";
    const { roles, pagination } = await roleService.getRoles(
      limit,
      offset,
      querySearch
    );
    res
      .status(200)
      .json({ message: "fetched roles successfully", roles, pagination });
  } catch (error) {
    next(error);
  }
};

export const getRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;
    const role = await roleService.getRole(roleId);
    res.status(200).json({ message: "fetched role successfully", role });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }
    const role = await roleService.createRole(req.body);

    res.status(201).json({ message: "role created successfully", role });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;
    const role = await roleService.updateRole(roleId, req.body);
    res.status(200).json({ message: "role updated successfully", role });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;
    await roleService.deleteRole(roleId);
    res.status(200).json({ message: "role deleted successfully" });
  } catch (error) {
    next(error);
  }
};
