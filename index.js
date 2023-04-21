// importing express
const express = require('express')

// importing openAI
const { Configuration, OpenAIApi } = require('openai')

// getting .env file configuration
require('dotenv').config()

// creating app
const app = express()

// Middleware to catch the incoming request
app.use(express.json())

// setting up open AI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)


const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Connectted to port ${PORT}`)
})