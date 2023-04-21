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

app.post('/convert', async (req, res, next) => {

    // const { prompt } = req.body
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `
                    console.log('Hello World);

                    Covert this code into Java 
                    ###
            `,
            max_tokens: 100,
        })

        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        })

    } catch (err) {
        console.log(err)
    }
})


const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Connectted to port ${PORT}`)
})