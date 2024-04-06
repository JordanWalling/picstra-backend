import Post from "../model/Post.js";

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
  const { title, desc, image } = req.body;
  if (!title || !desc) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }
  try {
    const newPost = new Post({ title, desc, image });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export { allPosts, createPost };
