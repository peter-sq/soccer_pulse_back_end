import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const adminAuth = (req, res, next ) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(error) {
                return res.status(401).json({
                    message: "Not Authorized"
                })
                
            }else{
                if(decodedToken.role !== "admin"){
                return res.status(401).json({message: "Not Authorized" })
            } else {
                next()
            }
        }
        })
    } else {
        return res.status(401).json({message: "Not Authorized Token not Available"})
    }

}
export const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(error){
                return res.status(401).json({
                    message: "Not Authorized"
                })
            } else {
                if(decodedToken.role !== "basic"){
                    return res.status(4021).jsom({message: "Not Authorized"})
                } else {
                    next()
                }
            }
        })
    } else{
        return res.status(401).json({
            message: "Noy Authorized, Token is Not Available"
        })
    }

}
