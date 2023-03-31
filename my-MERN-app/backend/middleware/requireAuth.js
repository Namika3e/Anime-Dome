// const { request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = async (req,res,next)=> {

    //verify if user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        // res.redirect('/login')
        return res.status(401).json({error: "Authorization token required, Please Login or SignUp"})
    }

    const token = authorization.split(' ')[1] //we need to grab the token from the authorization header. authorization outputs a string of two element: Bearer (then the token here)

    //verify that the token hasnt been tampered with
    try {
       const {_id} =  jwt.verify(token, process.env.SECRET)
       req.user = await User.findOne({_id}).select('_id') // simply attaching a user property to the req object so we can access it elsewhere. Just like how it is in regular object
       next();
    }
    catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth