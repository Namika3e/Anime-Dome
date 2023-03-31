const mongoose = require ('mongoose');
const validator = require('validator')
const bcrypt = require("bcrypt")



const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Pick a username"],
        unique: true,
        lowercase:true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // validate:[validator.isEmail, "Please enter a valid email"]

    },

    password: {
        type: String,
        required: true,
        minlength: 6

    }
})

//static signup methods
userSchema.statics.signup = async function (username, email, password) {
    //validation
    if(!email || !password || !username) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    } 

    if (!validator.isStrongPassword(password)) {
        throw Error("password not strong enough")
    }


     const exists = await this.findOne({email})

     if (exists) {
        throw Error("Email already in use")
     }

     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt)

     const user = await this.create({username, email, password: hash});
     console.log(validator)

     return user;
}

//static login method
userSchema.statics.login = async function(email,password) {
    if(!email || !password ) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    const userUsername = user.username;
    if(!user) {
        throw Error("Incorrect email")

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect Password")
    }

    return user;
    


}

// userSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt)//this keyword holds the instance of the object we created above in the schema for every user
//     next();
// });

const Users = mongoose.model('User', userSchema);
module.exports = Users;
















