const dotenv = require('dotenv')
// importing openAI
const { Configuration, OpenAIApi } = require('openai')

dotenv.config()

// setting up open AI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

module.exports = {
    PORT: process.env.PORT || 8081,
    SECRET: process.env.SECRET,
    openai
}