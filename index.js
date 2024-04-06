import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
