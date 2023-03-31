const mongoose = require("mongoose")
const Characters = require("../models/animes")
const User = require("../models/users")
const jwt = require("jsonwebtoken")


const createToken = (_id) => {
  return  jwt.sign({_id }, process.env.SECRET,{expiresIn: "3d"})
}



const getAllCharacters = async (req, res) => {
    const characters = await Characters.find({}).sort({ createdAt: -1 });
     res.status(200).json(characters)
     console.log(characters);
    
}

const postCharacters = async (req,res) => {
    try {
        const data = await Characters.create(req.body);
        res.status(200).json(data)
    }

    catch(error) {
        res.status(400).json({error: error.message})
        console.log(error)
    }
}

const login = async (req,res)=> {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signup = async (req,res) => {
    const { username, email, password } = req.body;

    try {
       const user =  await User.signup( username, email, password );
       //create a token
       const token = createToken(user._id)
       res.status(200).json({username, email, token})
    }
    catch(error) {
    //    const errors =  handleErrors(err)
        res.status(400).json({error: error.message});
    }
}
module.exports = {
    getAllCharacters,
    postCharacters,
    signup,
    login
}