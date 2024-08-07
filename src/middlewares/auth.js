import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


// Load environment variables
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

export const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Token:", token); // Log the token to verify it's being received

    if (token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if (error) {
                console.error("Token verification error:", error);
                return res.status(401).json({
                    message: "Not Authorized"
                });
            } else {
                if (decodedToken.role !== "admin") {
                    console.log("Unauthorized access attempt by user:", decodedToken);
                    return res.status(401).json({ message: "Not Authorized" });
                } else {
                    req.user = decodedToken; // Attach the decoded token to the request object
                    next();
                }
            }
        });
    } else {
        console.log("Token not available in cookies");
        return res.status(401).json({ message: "Not Authorized, Token not Available" });
    }
};

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
            message: "Not Authorized, Token is Not Available"
        })
    }

}
