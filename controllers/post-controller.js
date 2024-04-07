import Post from "../model/Post.js";
import cloudinary from "cloudinary";
import path from "path";
// GET /posts
const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

// POST /posts
const createPost = async (req, res) => {
  if (!req.body.title || !req.body.desc) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const imgUrl = result.secure_url;
    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      image: imgUrl,
    });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET /posts/:id
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { allPosts, createPost, getPost };
