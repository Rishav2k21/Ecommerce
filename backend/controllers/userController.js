const User=require("../models/userModel");
const sendToken = require("../utils/jwt");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser=async(req,res,next)=>{
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
    const {name,email,password,role}=req.body;
    const user=await User.create({
        name,
        email,password,role,
         avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    })

    sendToken(user,200,res);

}

exports.loginUser=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return res.status(400).json({
            "messege":"pls enter email and password first"
        })
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return res.status(401).json({
            "messege":"invalid email and password"
        })
    }

const ispassword=user.password===password;
if(!ispassword){
    return res.status(401).json({
        "messege":"incorrect password"
})
}
sendToken(user,200,res)
}


exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };
  
  exports.userDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  };
  exports.getAllUser = async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  };

  exports.getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return res.status(404).json({
    "messege":"user not found"
      })
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  };

  exports.deleteUser =async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return res.status(404).json({
        "messege":"user not found"
          })
    
    
    }
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  };
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched =(req.body.oldPassword===user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

  exports.updateRole=async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };
    
      await User.findByIdAndUpdate(req.params.id, newUserData, {
      });
    
      res.status(200).json({
        success: true,
      });
  }
  exports.forgetpassword=async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
  const resetToken=user.getresetpasswordtoken();
    await user.save({validateBeforeSave:false})
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
    const message = `Your profile password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try{
      await sendEmail({
        email:user.email,
        subject:`Ecommerce`,
        message,
      })
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,

      })

    }
    catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHander(error.message, 500));
    }
  }

exports.resetPassword=async(req,res,next)=>{
   const  resetPasswordToken=crypto
   .createHash("sha256")
   .update(req.params.token)
   .digest("hex");
   const user=await User.findOne({
    resetPasswordToken,
    // resetPasswordExpire: { $gt: Date.now() },
   })
   if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
}
// exports.updatePassword=async(req,res,next)=>{
//    const user=await User.findById(req.user.id).select("+password")

// }
