# STEPS ON BUILDING THE BACK END

---

## Initialise repository

---

- npm init
- git init, add, commit push to remote repository

## Install initial dependencies

---

- npm i express mongoose multer cloudinary

## Create index.js page

## Alter package.json - use modules instead

---

- "type": "module",

## add script to package.json file

---

```
    "start": "node index.js"
```

## Import dotenv

- npm i dotenv

## Create dotenv file

- PORT=....

## Create .gitignore to ignore node modules and .env file

---

## Create starting set up server

---

```
    import express from "express";
    import dotenv from "dotenv";
    dotenv.config();

    const app = express();

    app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello There" });
    });

    app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
    });


```

## run `npm run start` in the terminal and go to the localhost

---

- it should show

```

    {
    "message": "Hello There"
    }
```

## Add express middleware - to accept information from the req.body

---

```
    // middlewares
    app.use(express.json());

```

## Create a postSchema in models folder

---

```
    import mongoose from "mongoose";

    const postSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        unique: true,
        },
        desc: {
        type: String,
        required: true,
        },
        image: {
        type: String,
        required: false,
        },
    },
    { timestamps: true }
    );

    export default mongoose.model("Post", postSchema);


```

## Create initial routes for Post model in routes

---

```
    import express from "express";
    import { allPosts } from "../controllers/post-controller.js";

    const router = express.Router();

    // GET /posts
    router.get("/", allPosts);

    export default router;

```

## Create controller functions for routes

---

```

    const allPosts = (req, res) => {
    res.status(200).json({ message: "All Posts" });
    };

    export { allPosts };

```

## Import and use the post route

---

```
    import express from "express";
    import dotenv from "dotenv";

    dotenv.config();

    // import routes
    import postRoutes from "./routes/post-route.js";

    const app = express();

    // middlewares
    app.use(express.json());

    // routes
    app.use("/posts", postRoutes);

    app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello There" });
    });

    app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
    });


```

## Connect to MongoDb Database

---

- Create database connection string and put it in the .env file:

```
    MONGO_URL="mongodb://localhost:27017/yourDBNameHere"
```

- Create connectDb function in index.js:

```
    connectDb();

    async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
        console.log("Listening on port: ", process.env.PORT);
        });
    } catch (err) {
        console.log(err);
    }
    }
```

## Create Post Controller in post-controller

---

```
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
    }
    };
    export { allPosts, createPost };

```

## Create route for creating post

---

```
    import express from "express";
    import { allPosts, createPost } from "../controllers/post-controller.js";

    const router = express.Router();

    // GET /posts
    router.get("/", allPosts);

    // POST /posts
    router.post("/", createPost);

    export default router;

```

## Make Post request on Postman/ Mock FrontEnd

---

- Post request @ http://localhost:8080/posts
- in body/JSON enter details referring to Post Schema:

```
    {
  "title": "First Post",
  "desc": "My first post"
    }
```

## Create Get Single Post Controller

---

```
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

```

## Create get Post Route

---

```
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
```

## Test out in Postman

- GET request @ http://localhost:8080/posts/idNumberHere
