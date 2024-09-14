import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";

const userService = new UserService();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const querySearch = req.query.search ? (req.query.search as string) : "";
    const { users, pagination } = await userService.getUsers(
      limit,
      offset,
      querySearch
    );
    res
      .status(200)
      .json({ message: "fetched users successfully", users, pagination });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUser(userId);
    res.status(200).json({
      message: "fetched user successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const addNewRoleToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const roleId = req.body.roleId;
    await userService.addNewRoleToUser(userId, roleId);
    res.status(200).json({ message: "User role updated" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    await userService.updateUser(userId, data);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
