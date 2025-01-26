import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js"
import mongoose from "mongoose";


dotenv.config({ path: "../.env" });

const mongo_url = process.env.MONGO;
const port = process.env.PORT || 8080;

mongoose.connect(mongo_url).then(() => {
    console.log("mongodb is connected");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());


app.use("/api/auth", auth);


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);    
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  