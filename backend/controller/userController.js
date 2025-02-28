const UserModel = require('../models/UserModel')
const TokenModel = require('../models/TokenModel')
const emailSender = require('../middleware/emailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

exports.signUp = async(req,res) =>{

    let userToAdd = await UserModel.findOne({username :req.body.username})
    if(userToAdd)
    {
        return res.status(400).json({error:"Username isnt available"})
    }

    userToAdd = await UserModel.findOne({email :req.body.email})
    if(userToAdd)
    {
        return res.status(400).json({error:"Email already registered"})
    }

    let hashed_password = await bcrypt.hash(req.body.password,10)

    userToAdd = await UserModel.create({
        username: req.body.username,
        email : req.body.email,
        password: hashed_password,
        role: req.body.role
    })

    let tokenObj = await TokenModel.create({
        user : userToAdd._id,
        token: crypto.randomBytes(24).toString('hex')
    })
    if(!tokenObj){
        return res.status(400).json({error:"Something went wrong"}) 
    }

    let URL = `${process.env.FRONTEND_URL}/verify/${tokenObj.token}`

    emailSender({
        from: `noreply@gmail.com`,
        to: req.body.email,
        subject: `verification Email`,
        text: `click on the following link to verify ur account`,
        html: `<a href ='${URL}'><button>Verify now</button></a>`
    })

    res.send({message:"User registered successfully",userToAdd})

}

exports.verifyAccount = async(req,res)=>
{
    let tokenObj = await TokenModel.findOne({token: req.params.token})
    if (!tokenObj)
    {
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }

    let user = await UserModel.findById(tokenObj.user)
    if(!user)
    {
        return res.status(400).json({error:"User associated with token not found"})
    }

    if (user.isVerified)
    {
        return res.status(400).json({error:"User alreadu verified. Login to continue"})
    }

    user.isVerified = true

    user = await user.save()
    if(!user)
    {
        return res.status(400).json({error:"somethign went wrong"})
    }
    res.send({message:"User verified Successfully"})

}

exports.forgetPassword = async (req, res) => {
    let user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }

    let tokenObj = await TokenModel.create({
        user: user._id,
        token: crypto.randomBytes(24).toString('hex')
    })
    if (!tokenObj) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    let URL = `${process.env.FRONTEND_URL}/resetpassword/${tokenObj.token}`

    emailSender({
        from: `noreply@something.com`,
        to: req.body.email,
        subject: `Password reset email.`,
        text: `Click on the following link to reset your password.`,
        html: `<a href='${URL}'><button>Reset Password</button></a>`
    })
}

exports.resetPassword = async(req,res)=>{
    let tokenObj = await TokenModel.findOne({token: req.params.token})
    if (!tokenObj)
    {
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }

    let user = await UserModel.findById(tokenObj.user)
    if(!user)
    {
        return res.status(400).json({error:"User associated with token not found"})
    }

    let hashed_password = await bcrypt.hash(req.body.password, 10)
    user.password = hashed_password

    user = await user.save()
    if(!user)
    {
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Password Changed Successfully"})
}


exports.signin = async (req, res) => {
    const {email, password} = req.body

    let user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({error: "Email not registered."})
    }

    let passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return res.status(400).json({error: "Email and password do not match"})
    }

    if(!user.isVerified){
        return res.status(400).json({error: "User not verified. Verify first."})
    }

    const token = jwt.sign({
        _id: user._id,
        email,
        isAdmin: user.isAdmin,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn: "24h"})

    if(!token){
        return res.status(400).json({error: "Something went wrong"})
    }

    res.send({token, user: {
        _id: user._id,
        email,
        isAdmin: user.isAdmin,
        username: user.username,
        role: user.role
        }
    })
}