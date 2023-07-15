const app=require("./app");

const cloudinary = require("cloudinary");

const connectDatabase=require("./config/database")
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

connectDatabase();
// dotenv.config({path:"backend/config/config.env"});
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(process.env.PORT,()=>{
    console.log(`server is working at https://localhost:${process.env.PORT}`)
})