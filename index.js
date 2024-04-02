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
