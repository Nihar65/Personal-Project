const nodemailer = require('nodemailer');
const user = require('../model/authmodel');
const generatedOtp = require('../model/generatedotp');
const GenerateOtp = async (req, res) => {
  // console.log(req)
  const data = req.body;

  if (data) {

    const userEmail = data.email;
    const userExist = await user.findOne({ 'email': userEmail });
    console.log("USEREXIST<<>><><<>><><", userExist);
    if (!userExist) {

      try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp)
        const otpGenerated = await generatedOtp.create({ otp });
        console.log("otp stored in backend", otpGenerated)

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for port 465, false for other ports
          auth: {
            user: "ravalnihar00@gmail.com",
            pass: "nnzqprassatpszhh",
          },
        });
        const info = await transporter.sendMail({
          from: 'ravalnihar00@gmail.com', // sender address
          to: data.email, // list of receivers
          subject: "Your OTP", // Subject line
          text: "Your vrify OTP " + otp // html body
        });
        if (info) {
          console.log("Otp Sent")
          
        res.json({ 'msg': "OTP sent to your address",'status':200 })
        }
      }
      catch (error) {
        console.log(error)
        res.json({ 'msg': error,'status':400 })
      }
    }
    else {
      console.log("User Already Exist!");
      res.json({"msg":"User Exists!",'status':400});
    }


  }
}
const Registration = async (req, res) => {
  try {
    const data = req.body;
    console.log("DATA IN REGISTRATION<>><><><><><><><><", data)
    if (data) {
      console.log("<>><><><INSIDE IF")
      const userOtp = data.otp;
      const validOtp = await generatedOtp.findOne({ 'otp': userOtp });
      console.log("VALIDOTP<><><><><><>><>", validOtp)
      if (validOtp) {
        console.log("INSIDE IF<<>><><<>><><");
        const userEmail = data.email;
        const userExist = await user.findOne({ 'email': userEmail });
        console.log("USEREXIST<<>><><<>><><", userExist);
        if (!userExist) {
          console.log("INSIDE CREATING DATA<>><<>><")
          const { username, email, work, password } = data
          console.log(username)
          const createdUser = await user.create({ username, email, work, password })
          if (createdUser) {
            res.json({ "msg": "User Registered Successfully",'status':200  })
          }
          else {
            
        res.json({ 'msg': "User Not Registered" ,'status':400 })
          }
        }
        else {
          res.json({ "msg": "User already exists!" ,'status':400 })
        }
      }
      else {
        console.log("ERROR IN VALIDOTP<>><><><<>><")
        res.status(400).json({ "msg": "Pls enter valid otp!" })
      }
    }
  }
  catch (error) {
    console.log("ERROR IN CATCH<><><>>", error)
    res.json({ 'msg':" ERROR IN CATCH" })
  }
}
const LoggedIn = async (req, res) => {
  const data = req.body;
  console.log("DATA IN LOGGED IN<>><><<><>", data);
  try {

    if (data) {
      const { email, password } = data;
      const userExist = await user.findOne({ "email": email });
      console.log("USEREXIST<><><><><<>", userExist)
      if (userExist) {
        if (userExist.password == password) {
          res.json({ "msg": "Logged in successful!",'status':200  });
          console.log("USER FOUND><<><><>><><")
        }
        else {
          res.json({ "msg": "Logged in unsuccessful!",'status':400  });
          console.log("USER NOT FOUND><<><><>><><")

        }
      }
    }
  }
  catch (e) {
    console.log("ERROR IN LOGGED IN><><<><>><><><", e)
    res.json({ "msg": "Error found in catch of logged in<>><<>",'status':400 })
  }
}
module.exports = { GenerateOtp, Registration, LoggedIn }