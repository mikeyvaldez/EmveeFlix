import express from "express"; // import express
import cors from "cors"; // import cors
import movieRoutes from "./routes/movies.route.js";
import authRoutes from "./routes/auth.route.js";
import subRoutes from "./routes/sub.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express(); // create express app

app.use(express.json());
app.use(cors());


dotenv.config({ path: "../.env" });

const mongo_url = process.env.MONGO;
const port = process.env.PORT || 8080;

mongoose
.connect(mongo_url)
.then(() => {
  console.log("mongodb is connected");    
  })
  .catch((err) => {
    console.log(err);
  });
  
  
  // listen on port
  app.listen(port, () => {
    console.log(`Now listening on PORT ${port}`);
  });
  
  // root page
  app.get("/", (req, res) => {
    return res.send("HELLO WORLD");
  });
  
  // app.use("", Movies);
  app.use("/auth", authRoutes);
  app.use("/movies", movieRoutes);
  app.use("/sub", subRoutes);
