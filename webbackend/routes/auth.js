const express=require("express");
const Router=express.Router();
const {check} =require('express-validator');

const {signout,signup,signin,IsSignedIn}=require("../controllers/auth");


Router.post("/signup",
[
    check("name","name should be at least 3 char").isLength({min:3}),
    check("email","email is reqired").isEmail(),
    check("password","password feild is required").isLength({min:3}),
],signup);

Router.post("/signin",
[
   
    check("email","email is reqired").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3}),
],signin);

Router.get("/signout",signout);



module.exports=Router;
