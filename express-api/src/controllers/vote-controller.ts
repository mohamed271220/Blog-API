import { NextFunction, Request, Response } from "express";
import { VoteService } from "../services/vote-service";
import { CustomError } from "../utils/CustomError";
import { userRequest } from "../interfaces";

const voteService = new VoteService();

export const createVote = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found");
    }
    const { postId } = req.params;
    const userId = req.user.id;
    const { type } = req.body;
    if (!type || (type !== "upvote" && type !== "downvote")) {
      throw new CustomError("type is required", 400);
    }
    const vote = await voteService.createVote(postId, userId, type);
    res.status(201).json({ message: "vote created successfully", vote });
  } catch (error) {
    next(error);
  }
};
export const deleteVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { voteId } = req.params;
    await voteService.deleteVote(voteId);
    res.status(200).json({ message: "vote removed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getVotesByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const { upvotes, downvotes, totalVotes, upvoteRatio, downvoteRatio } =
      await voteService.getVotesByPostId(postId);
    res.status(200).json({
      message: "fetched votes successfully",
      upvotes,
      downvotes,
      totalVotes,
      upvoteRatio,
      downvoteRatio,
    });
  } catch (error) {
    next(error);
  }
};

export const getVotesByUserId = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found");
    }
    const userId = req.user.id;
    const { votes } = await voteService.getVotesByUserId(userId);
    res.status(200).json({ message: "fetched votes successfully", votes });
  } catch (error) {
    next(error);
  }
};

export const getVoteForUserByPostId = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found");
    }
    const userId = req.user.id;
    const { postId } = req.params;
    const  vote  = await voteService.getVoteForUserByPostId(userId, postId);
    res.status(200).json({ message: "fetched vote successfully", vote });
  } catch (error) {
    next(error);
  }
};

export const getVotesByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { votes } = await voteService.getVotesByCategoryId(categoryId);
    res.status(200).json({ message: "fetched votes successfully", votes });
  } catch (error) {
    next(error);
  }
};

export const getVotesByTagId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    const { votes } = await voteService.getVotesByTagId(tagId);
    res.status(200).json({ message: "fetched votes successfully", votes });
  } catch (error) {
    next(error);
  }
};
