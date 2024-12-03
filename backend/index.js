import express from "express";  // import express
import cors from "cors";        // import cors
import Movies from "./routes/movies.js";
import Auth from "./routes/auth.js";
import Sub from "./routes/sub.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors())

dotenv.config({ path: "../.env" });

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO;

mongoose
  .connect(
    mongo_url
  )
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });



  // root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});

app.use("", Movies);
app.use("/auth", Auth);
app.use("/sub", Sub);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
