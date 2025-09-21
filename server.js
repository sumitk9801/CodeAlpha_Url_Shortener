import express from "express";
import connectDB from "./db/connect.js";
import urlRoute from "./routes/urlRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

connectDB();

const port = process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/url",urlRoute);

app.get("/",()=>{
    console.log("route is working");
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
