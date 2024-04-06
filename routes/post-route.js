import express from "express";
import {
  allPosts,
  createPost,
  getPost,
} from "../controllers/post-controller.js";

const router = express.Router();

// GET /posts
router.get("/", allPosts);

// POST /posts
router.post("/", createPost);

// GET /posts/:id
router.get("/:id", getPost);

export default router;
