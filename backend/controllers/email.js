const expressAsyncHandler = require('express-async-handler');
const dotenv = require('dotnev');
const nodemailer = require('nodemailer')
dotenv.config();

let transporter = nodemailer.createTransport({
    host : Process.env.SMTP_HOST,
    port : Process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_MAIL,
        pass :process.env.SMTP_PASS

    },
});


async function sendMail(to, subject, text, html) {
    // Mail options with the parameters passed
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to, 
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions,function(error , info){
        if(error){
            console.log(error)
        }else{
            console.log("User Registered Successfully")
        }
    })
}

MediaSourceHandle.export={ sendMail }