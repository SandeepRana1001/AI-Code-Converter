const app = require('./app')

const config = require('./config')

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

const PORT = config.PORT || 8081


app.listen(PORT, () => {
    console.log(`Connectted to port ${PORT}`)
})
