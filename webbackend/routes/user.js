const express=require("express");
const router =express.Router();

const {getUserById,getUser,updateUser,userPurchaseList}=require("../controllers/user");
const {IsSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");

router.param("userId",getUserById)


router.get("/user/:userId",IsSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",IsSignedIn,isAuthenticated,updateUser);
router.put("/orders/user/:userId",IsSignedIn,isAuthenticated,userPurchaseList);


module.exports=router;

