import express from "express";

const app = express();

app.get("/hello", (_, res) => {
  res.status(200).json({ message: "Salam perdamaian!!" });
});

export default app;
