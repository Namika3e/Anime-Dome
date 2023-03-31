const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require("./routes/routes")
const bodyParser = require('body-parser')
const cors = require("cors")
const Users = require("./models/users")
const { signup,login } = require("./controllers/controller")


//MIDDLEWARE
app.use(express.json({ extended: false }));
app.use(cors())


app.use((req,res,next)=> {
    console.log(req.path,req.method)
    next();
});


// app.use(bodyParser.json());


//connect to db
mongoose.connect(process.env.MONGO_URI) 
.then(res => {
    app.listen(process.env.PORT, ()=> {
        console.log("database is connected and server is up")
    })
})
.catch(err=>console.log(err));



app.post("/signup", signup)

app.post("/login", login);


app.use('/api', routes);       


