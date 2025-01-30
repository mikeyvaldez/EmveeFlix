import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";
import subRoutes from "./routes/sub.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config({ path:"../.env" });
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", moviesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sub", subRoutes);

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve the static frontend build files
app.use(express.static(path.join(__dirname, "client", "dist")));

// Serve the React app for all other routes (single-page app fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.listen(port, () => {
  console.log(`Now listening on PORT ${port}`);
});