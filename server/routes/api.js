const express = require("express");
const router = express.Router()
const { countries, getcountry, insertCountry, checkExistingRank, insertImage } = require('../services/countries')

router
    .get('/', (req, res) => { res.send("Hello from api route....!!") })
    .get('/countries', countries)
    .get('/countries/:id', getcountry)
    .get('/countries/rank/:rank', checkExistingRank)
    .post('/countries', insertCountry)
    .post('/countries/flag', insertImage)

module.exports = router