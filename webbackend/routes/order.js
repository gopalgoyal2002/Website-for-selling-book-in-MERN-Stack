const express= require('express');
const router=express.Router();



const {getUserById,pushOrderInPurchaseList}=require("../controllers/user");
const {IsSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus}=require("../controllers/order");
const {updateStock}=require("../controllers/product");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//actualrouter


//create
router.post("/order/create/:userId",
IsSignedIn,
isAuthenticated,
pushOrderInPurchaseList,
updateStock,
createOrder
);

//read
router.get("/order/all/:userId",IsSignedIn, isAuthenticated,isAdmin,getAllOrders);

//status
router.get("/order/status/:userId",IsSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",IsSignedIn,isAuthenticated,isAdmin,updateStatus);
module.exports=router;