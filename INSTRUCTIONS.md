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
