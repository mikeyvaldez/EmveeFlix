import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";
import dotenv from "dotenv";

dotenv.config({ path:"../.env" });
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});

app.use("/api", moviesRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/sub", require("./routes/sub"));

app.listen(8080, () => {
  console.log(`Now listening on PORT ${port}`);
});
