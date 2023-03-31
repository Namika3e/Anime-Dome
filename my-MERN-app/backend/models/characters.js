const mongoose = require ('mongoose');

const Schema = mongoose.Schema

const characterSchema = new Schema({
    //Anime Character is from
    animeName: {
        type: String,
        required: true
    }, 

    // Character data
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    }, 

    height: {
        type: Number,
        required:true
    },

    clan: {
        type: String,
        required: true
    },

    occupation: {
        type: String,
        required: true
    }, 

    backStory: {
        type: String,
        required: true
    },
    
    backgroundPhoto: {
        type: String,
        required: true
    },  

    displayPhoto: {
        type: String,
        required: true
    },

    childPhoto: {
        type: String,
        required: true
    },

    adultPhoto: {
        type: String,
        required: true
    }
    
})

const Characters = mongoose.model("Character", characterSchema)
module.exports = Characters;