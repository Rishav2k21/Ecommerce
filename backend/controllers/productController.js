const Product=require("../models/productModel")
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.getAllProducts=async(req,res,next)=>{
   const resultperpage=8;
   const productscount = await Product.countDocuments();
   const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter();
   
   let products=await apiFeature.query;
   let filteredproductcount = products.length;
   apiFeature.pagination(resultperpage);
     products=await apiFeature.query.clone( );
    res.status(200).json({
      success: true,
         products,
         resultperpage,
         filteredproductcount,
          productscount
     } )
}
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if(!product){
       return  res.status(404).json({
            "messege":"product not found"
        })
    }
     let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }


    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true  
    })
    res.status(200).json({
        success:true,
        product
    })
}
exports.deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
       return res.status(404).json({
            "messege":"product not found"
        })
    }
      for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    await product.deleteOne();
   res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
}

exports.getProductDetails =async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(404).json({
            "messege":"product not found"
        })
    }
    
  
    res.status(200).json({
      success: true,
      product,
    });
  };
 exports.createreview=async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }
  const product = await Product.findById(productId);
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;
let avg=0;
product.reviews.forEach((rev)=>{
  avg+=rev.rating;
});
product.ratings=avg/product.reviews.length;
await product.save({ validateBeforeSave: false });

res.status(200).json({
  success: true,
});
 }

 exports.getProductReviews =  async(req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return res.status(401).json({
      messege:"product not found"
    })
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
