const express=require('express');
const router=express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require("../controllers/category")
const {IsSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
//create routes
router.post("/category/create/:userId",IsSignedIn,isAuthenticated,isAdmin,createCategory);
//read
router.get("/category/:categoryId",getCategory);
 router.get("/categories",getAllCategory);
//update
router.put("/category/:categoryId/:userId",IsSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete("/category/:categoryId/:userId",IsSignedIn,isAuthenticated,isAdmin,removeCategory);
module.exports=router;