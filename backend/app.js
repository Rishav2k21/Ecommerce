const express=require("express");

const app=express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
 const product=require("./routes/productRoute")
 const user=require("./routes/userRoute")
 const order=require("./routes/orderRouter")
const payment = require("./routes/paymentRoute");
const errorMiddleware = require("./middleware/error");
const path = require("path");

const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(express.json());

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
app.use(errorMiddleware);

module.exports=app;