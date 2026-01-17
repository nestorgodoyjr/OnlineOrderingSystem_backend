import CustomError from "../utils/CustomError.js"

const authorizeRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)) {
            throw new CustomError('Access denied!', 403)
        }
        next()
    }
}

export default authorizeRole
