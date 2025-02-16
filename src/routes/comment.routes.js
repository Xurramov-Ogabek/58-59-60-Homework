import express from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
} from "../controllers/comment.controller.js";

export const commentRouter = express.Router(); 

commentRouter.post("/", createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.delete("/:id", deleteComment);
