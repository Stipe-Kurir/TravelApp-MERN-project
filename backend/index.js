const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const pinRoute=require("./routes/pins");
const userRoute=require("./routes/users");


dotenv.config();

app.use(express.json());

mongoose.set('strictQuery', true); //zbog warning-a
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(()=>{
    console.log("MongoDB connected!");
}).catch(err=>console.log(err));

app.use("/api/users",userRoute);
app.use("/api/pins",pinRoute);



app.listen(8800, ()=>{
    console.log("BACKEND SERVER IS RUNNING");
})
