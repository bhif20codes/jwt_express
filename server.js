// load the dotenv process, so data can be used from .env
require("dotenv").config()

// import express library and use it
const express = require("express")
const app = express()

// use jwt library for the authentication with JWTs
const jwt = require("jsonwebtoken")

// lets the application use json from the body in the request
app.use(express.json())

const postData = [
    {
        username: 'Paul',
        title: 'Post 1'
    },
    {
        username: 'Lukas',
        title: 'Post 2'
    }
]

app.get("/post", authenticateToken, (req, res) => {
    res.json(postData.filter(post => post.username === req.user.name))
})

// create middleware function to check user
function authenticateToken(req, res, next) {

    // get the bearer token in the format: Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
        }

        req.user = user
        next()
    })
}

// start the server and on port 3000
app.listen(3000)