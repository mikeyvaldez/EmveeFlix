import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";
import subRoutes from "./routes/sub.js";
import dotenv from "dotenv";


dotenv.config({ path:"../.env" });
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());



app.use("/api", moviesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sub", subRoutes);


app.listen(port, () => {
  console.log(`Now listening on PORT ${port}`);
});