const jwt=require("jsonwebtoken")


const sendToken=(user,statuscode,res)=>{
    const token = jwt.sign({id:user._id},"process.env.JWT_SECRET")

    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000)
    }).json({
      success:true,
      user,
      token
    })
}
module.exports=sendToken;