const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());

app.use("/users",userRouter);

mongoose.connect("mongodb+srv://chiragpatel4825:chirag1234@cluster0.m1nbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(5000,()=>{
        console.log("server is started at port : 5000");
    });
})
.catch((err)=>{
    console.error(err)
});

