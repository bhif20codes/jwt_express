// load the dotenv process, so data can be used from .env
require("dotenv").config()

// import express library and use it
const express = require("express")
const app = express()

// use jwt library for the authentication with JWTs
const jwt = require("jsonwebtoken")

// lets the application use json from the body in the request
app.use(express.json())

// normally refresh tokens are stored in a database // refresh project -> empty
let refreshTokens = []

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;

    if (refreshTokens == null) return res.sendStatus(401)

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        const accessToken = generateAccessToken({ name: user.name })

        res.json({accessToken: accessToken})
    })
})

app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post("/login", (req, res) => {
    // Authentication of user with jwt
    const username = req.body.username

    const user = {
        name: username
    }
    // create initial access token for the user, that expires after set amount of time
    const accessToken = generateAccessToken(user)

    // use this token for the user to refresh time on the initial token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    // save token
    refreshTokens.push(refreshToken);

    // return user tokens
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
    // returns new jwt with the secret from the .env file with expiration date of 30 minutes
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

// let the auth server run on port 4000
app.listen(4000)