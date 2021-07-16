require('dotenv').config();


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const express=require('express');

const app=express();




//my routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const ordertRoutes=require("./routes/order");

const paymentBRoutes=require("./routes/paymentBroutes");


//db connection
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true
}).then(()=>{
console.log("DB connected")
});

//this is my middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//routers
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",ordertRoutes);

app.use("/api",paymentBRoutes);




//port
const port=process.env.PORT || 8000;
//starting a server
app.listen(port ,()=>{
    console.log("app is running..")
})