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
