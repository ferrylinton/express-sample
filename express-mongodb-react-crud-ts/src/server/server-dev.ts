import ViteExpress from "vite-express";
import app from "@src/server/app";

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
