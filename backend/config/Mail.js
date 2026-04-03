import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
const sendMail=async(to,otp)=>{
   await transporter.sendMail({
        from:`${process.env.EMAIL}`,
        to,
        subject:"Reset your Password",
        html:`Your OTP for password reset is <b>${otp}</b>.It expires in 5 minutes.</p>`
    })
}
export default sendMail