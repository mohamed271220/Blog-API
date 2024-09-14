import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response) => {
  if (!req.files) {
    return res.status(400).send("No files uploaded.");
  }

  const uploadedFiles = (req.files as Express.MulterS3.File[]).map(
    (file) => file.location
  );

  res.status(200).send(uploadedFiles);
};
