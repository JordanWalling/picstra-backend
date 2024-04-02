import express from "express";
import { allPosts } from "../controllers/post-controller.js";

const router = express.Router();

// GET /posts
router.get("/", allPosts);

export default router;
