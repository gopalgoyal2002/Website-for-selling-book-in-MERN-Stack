const User=require("../models/user")
const {check,validationResult} =require('express-validator');
const { errors } = require("formidable");
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User Signout successfully"
    });
};



exports.signin = (req,res)=>{

    const errors=validationResult(req);

   const{email,password}=req.body;
   
   if(!errors.isEmpty()){
    return res.status(422).json({
        error:errors.array()[0].msg
    });
}

User.findOne({email},(err,user)=>{
    if(err||!user)
    {
       return res.status(400).json({
            error:"USER email does not exist"
        });
    }

    if(!user.autheticate(password)){
      return  res.status(401).json({
         error:"EMAIL ans PASSWORD do not match"
        });
    }
    //create a token
  const token=jwt.sign({_id:user._id},"process.env.SECREAT")
  // put in cookie
  res.cookie("token",token,{expire: new Date()+999});

  //send response to front end
  const {_id,name,email,role}=user;
  return res.json({
      token,user:{_id,name,email,role}
  });
});



};

exports.signup = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        name: user.name,
        email: user.email,
        id: user._id
      });
    });
  };

//protect the routes
exports.IsSignedIn = expressjwt({
    secret : "process.env.SECREAT",
    userProperty:"auth"
});


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin=(req,res,next)=> {
    if(req.profile.role===0){
        res.status(403).json({
            error:"You are not admin,ACCESS DENIED"
        });
    };

    next();
 }