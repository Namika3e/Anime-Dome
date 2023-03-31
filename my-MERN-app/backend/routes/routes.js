const express = require("express")
const router  = express.Router()
const {getAllCharacters, postCharacters} = require("../controllers/controller");
const mongoose = require("mongoose")
const Characters = require("../models/animes")
const requireAuth = require('../middleware/requireAuth')

//require auth for all routes
router.use(requireAuth)

router.get("/characters", getAllCharacters)

router.post("/characters", postCharacters)

module.exports = router;