const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv  = require ("dotenv");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const WRRouter = require("./routes/workReportRoute");
const atendenceRouter = require("./routes/atendence");
const OVRouter = require("./routes/overtime");



dotenv.config();


mongoose
.set('strictQuery', false)
.connect(process.env.mongoDB_URL)
.then(() => console.log("DB Connection Successfull!"))
.catch((err) => {
    console.log(err);
});

const date = new Date().toLocaleTimeString(); ;
console.log(date);


app.use(express.json());
app.use("/api/auth" , authRouter );
app.use("/api/user" , userRouter);
app.use("/api/WR" ,  WRRouter);
app.use("/api/atend" , atendenceRouter);
app.use("/api/OV" , OVRouter);



app.listen(process.env.port || 5000 , () =>{
    console.log("Backend server is running!");
});