import mongoose from "mongoose";

import app from "./app.js";

const {DB_HOST, PORT = 5000} = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 5000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
