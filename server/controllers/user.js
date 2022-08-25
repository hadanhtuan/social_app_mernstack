import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {  //register
  console.log(1)
  try {
    const { email, password, firstName, lastName } = req.body
    
    const oldUser = await User.findOne({email})
    if(oldUser) return res.status(400).json({message: 'User already exits'})

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email, 
      password: hashPassword, 
      name: `${firstName} ${lastName}`
    })
    await newUser.save()

    const token = jwt.sign({email, id: newUser._id}, process.env.SECRET, { expiresIn: "1h"})
    
    res.status(201).json({
      result: newUser,
      token
    })
 
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

const signin = async (req, res) => {  //register
  console.log(2)
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({email})
    
    if(!user) return res.status(404).json({message: "Email or password wrong"})
    console.log(user.password)

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) return res.status(404).json({message: "Email or password wrong"})

    const token = jwt.sign({email, id: user._id}, process.env.SECRET, { expiresIn: "1h"})
    
    res.status(200).json({
      result: user,
      token
    })
 
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error})
  }
}

export {
  signup,
  signin
}





