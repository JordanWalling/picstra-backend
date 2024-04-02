const allPosts = (req, res) => {
  res.status(200).json({ message: "All Posts" });
};

export { allPosts };
