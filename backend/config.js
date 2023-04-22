const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8081,
    SECRET: process.env.SECRET,
    OPENAI_KEY: process.env.OPENAI_KEY
}