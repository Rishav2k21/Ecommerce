const nodeMailer=require("nodemailer")
const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        host: "smpt.gmail.com",
        port: 465,
        service: "gmail",
        secure:true,
        secureConnection:false,
        auth: {
          user: "rishavanand2k21@gmail.com",
          pass: "riudjpwlsbsccljo",
        },
      }); 

    const mailOptions={
        from:"rishavanand2k21@gmail.com",
        to:options.email,
        subject:options.subject,
        text: options.message

    }
    await transporter.sendMail(mailOptions)
}
module.exports=sendEmail;