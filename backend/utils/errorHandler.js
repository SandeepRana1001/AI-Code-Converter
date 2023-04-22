const errorHandler = (error, req, res, next) => {
    console.log(error)
    return res.status(error.statusCode).send({
        message: error.message,
    })
}

module.exports = errorHandler