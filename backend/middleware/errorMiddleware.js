
// error middleware
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    console.log("error handler".bgCyan)
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: err.stack,
        handler: true
    })
}