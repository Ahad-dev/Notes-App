import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

//Import Routes
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

//Excess all env variables
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

//Connect ot database
connectDB();

//Routes

app.use("/api/note",userRoute);
app.use("/api/auth",authRoute);



let PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`Server is Listen on http://localhost:${PORT}`))