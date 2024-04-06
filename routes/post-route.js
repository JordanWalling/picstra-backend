import express from "express";
import { allPosts, createPost } from "../controllers/post-controller.js";

const router = express.Router();

// GET /posts
router.get("/", allPosts);

// POST /posts
router.post("/", createPost);

export default router;
