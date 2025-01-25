import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js"

dotenv.config();


const port = process.env.PORT || 8080;


const app = express();
app.use(express.json());
app.use(cookieParser);


app.use("/api/auth", auth);




app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

