const express=require("express");
const { registerUser, loginUser,updateProfile,updatePassword, logout ,userDetails, getSingleUser, updateRole, deleteUser, getAllUser, forgetpassword, resetPassword} = require("../controllers/userController");
const {isAuth,isrole}=require("../middleware/auth")
const router=express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/me").get(isAuth,userDetails)
router.route("/admin/user/:id").get(isAuth,isrole("admin"),getSingleUser).put(isAuth,isrole("admin"),updateRole).delete(isAuth,isrole("admin"),deleteUser)
router.route("/admin/users").get(isAuth,isrole("admin"),getAllUser)
router.route("/password/forgot").post(forgetpassword)
router.route("/password/reset/:token").put(resetPassword);
router.route("/me/update").put(isAuth, updateProfile);
router.route("/password/update").put(isAuth, updatePassword);

module.exports=router;
