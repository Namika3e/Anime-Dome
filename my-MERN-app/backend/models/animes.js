const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const animesSchema = new Schema({
    name: {
        type: String,
        required: true,

        characters: [{
            type: Schema.Types.ObjectId, ref: 'characters'
        }]

    }
    
}, { timestamps: true})

const Animes = mongoose.model('Character', animesSchema)

module.exports = Animes;

