const bcrypt = require("bcrypt");
const User = require("../models/usermodel")

const register = async function(req,res){
    try {
        console.log("done")
      //generate new Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
  
      //create new user
      const newUser = req.body
  
      let {User_name, email_id , Password} = newUser
      //USERNAME VALIDATION -->
     
      let usernameCheck = await User.findOne({ User_name: req.body.User_name })
      if (usernameCheck) return res.status(409).send({ status: false, message: "username already used" })
  
      
      //EMAIL VALIDATION -->
      let emailCheck = await User.findOne({ email_id: req.body.email_id })
      if (emailCheck) return res.status(409).send({ status: false, message: "email already used" })
      
  
      //Password VALIDATION -->
    
      if (!Password) { return res.status(400).send({ status: false, message: "Please include a Password" }) };
      if (!isValid(Password)) { return res.status(400).send({ status: false, message: "Password is invalid" }); }
      if ((Password).includes(" ")) { { return res.status(400).send({ status: false, message: "Please remove any empty spaces in Password" }); } }
      if (!((Password.length >= 8) && (Password.length < 15))) { return res.status(400).send({ status: false, message: "Password should be in 8-15 character" }) }
      console.log(newUser)
      //save user and respond
      const user = await User.create(newUser)
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err)
    }
}

const login = async function(req,res){
    try {
        const user = await User.findOne({ email_id: req.body.email_id });
        !user && res.status(404).json("user not found");
    
        const validPassword = await bcrypt.compare(req.body.Password, user.Password)
        !validPassword && res.status(400).json("wrong password")
    
        res.status(200).json(user)
      } catch (err) {
        res.status(500).json(err)
      }
}


module.exports={register, login}