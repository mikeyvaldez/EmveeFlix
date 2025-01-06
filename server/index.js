
import express from "express";  // import express
import cors from "cors";        // import cors
import Movies from "./routes/movies.js";
import Auth from "./routes/auth.js";
import Sub from "./routes/sub.js";


const app = express();  // create express app

app.use(express.json())
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});


app.use("", Movies);
app.use("/auth", Auth);
app.use("/sub", Sub);

const port = process.env.PORT || 8080;


// listen on port
app.listen(port, () => {
  console.log(`Now listening on PORT ${port}`);
});




