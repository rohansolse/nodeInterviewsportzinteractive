const express = require("express");
const cors = require('cors')
const port = 8080;
const app = express()
const api = require('./routes/api')
app.use(cors())
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/api', api)

app.get('/', (req, res) => {
    res.send("Hello from the server")
})

app.listen(port, () => {
    console.log("server is lisning at  :", port);
})