import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

connectDB();

const port = process.env.PORT ;

app.use(express.json());

app.get("/",()=>{
    console.log("route is working");
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
