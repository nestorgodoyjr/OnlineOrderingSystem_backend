const errorMiddleware = async ( error, req, res, next ) => {
    let statusCode = error.statusCode || 500
    let message = error.message || 'Internal Server Error'

    if( error.code === 11000 ) {
        statusCode = 400
        message = 'Duplicate input value entered!'
    }else if( error.name === 'ValidationError' ){
        statusCode = 400
        message = Object.values(error.errors)
            .map( item => item.message )
            .join(', ')
    }else if( error.name === 'CastError' ){
        statusCode = 400
        message = 'Invalid ID'
    }

    res.status(statusCode).json({
        success: false,
        message
    })
}

export default errorMiddleware