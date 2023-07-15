const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        // unique: true,
        // validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
      },
      role: {
        type: String,
        default: "user",
      },
       avatar: {
    public_id: {
      type: String,
      
    },
     url: {
      type: String,
      required: true,
    }},
      createdAt: {
        type: Date,
        default: Date.now,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
});
userSchema.methods.getresetpasswordtoken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
//15 min
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}
module.exports = mongoose.model("User", userSchema);
