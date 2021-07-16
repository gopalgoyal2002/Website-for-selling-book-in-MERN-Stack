const Product=require("../models/product");
const formidable=require("formidable");
const _ =require("lodash");
const fs=require("fs");


exports.getProductById=(req,res,next,id)=>{
     Product.findById(id)
     .populate("category")
     .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.product=product;
        next();
     });
};
//create 
exports.createProduct=(req,res)=>{
     let form=new formidable.IncomingForm();
     form.keepExtensions=true;

     form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Product is not created,problem in IMAGE"
            });
        }

        //destructure the fields
         const {name,description,price,category,stock}=fields;

         if (!name||!description||!price||!category||!stock){
            return  res.status(400).json({
                error:"Please include all fields"
            });
        }

   
       let product=new Product(fields);
      

       //handle the files
       if(file.photo){
           if(file.photo.size>3000000){
               return  res.status(400).json({
                   error:"file size is too big"
               })
           }
           product.photo.data=fs.readFileSync(file.photo.path);
           product.photo.contentType=file.photo.type
       }
         console.log(product);
       //save to the DB
       product.save((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Saving books in DB failed"
            });
        }
            res.json(product)
       });

     })
};


exports.getProduct=(req,res)=>{
    req.product.photo=undefined ;
    return res.json(req.product);
}


//middleware
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
    next();
}
//delete controller
exports.updateProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
       if(err){
           return res.status(400).json({
               error:"Product is not created,problem in IMAGE"
           });
       }

      //updation code
      let product=req.product;
     product=_.extend(product,fields);

      //handle the files
      if(file.photo){
          if(file.photo.size>3000000){
              return  res.status(400).json({
                  error:"file size is too big"
              })
          }
          product.photo.data=fs.readFileSync(file.photo.path);
          product.photo.contentType=file.photo.type
      }
        console.log(product);
      //save to the DB
      product.save((err,product)=>{
       if(err){
           return res.status(400).json({
               error:"updation of product failed"
           });
       }
           res.json(product)
      });

    })
};
//update controller
exports.deleteProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,delectedproduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the Product"
            });
        }
        res.json({
            messege:"DElection was successfully",
            delectedproduct
        });
    });
};

//product listining
exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):8
    let sortBy=req.query.sortBy?req.query.sortBy:"_id"
    
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"NO product found"
            })
        };
        res.json(products);
    });
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"NO category found"
            })
        }
        res.json(category);
    })
}

exports.updateStock=(req,res,next)=>{
    let myOprations =req.body.order.products.map(prod=>{
        return {
        updateOne :{
            filter:{_id:prod._id},
            update:{$inc:{stock:-prod.count, sold: +prod.count}}
        }
      } ;
    });

    product.bulkWrite(myOprations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"BULK Opration failed"
            });
        };
        next();
    });
};
