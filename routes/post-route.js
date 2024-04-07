import express from "express";

import {
  allPosts,
  createPost,
  getPost,
} from "../controllers/post-controller.js";
import cloudinary from "cloudinary";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

// GET /posts
router.get("/", allPosts);

// POST /posts
router.post("/", upload.single("image"), createPost);

// GET /posts/:id
router.get("/:id", getPost);

export default router;
