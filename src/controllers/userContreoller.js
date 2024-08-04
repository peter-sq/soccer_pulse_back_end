import User from '../models/Users.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

//Register a User
export const registerUser = async (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Check if all required fields are present
    if (!email) {
        return res.status(400).json({ 
            message: "Email is required" 
        });
    } else if (!password) {
        return res.status(400).json({
            message: "Password must not be empty"
        });
    } else if (password.length < 6) {
        return res.status(400).json({ 
            message: "Password must be greater than 6 characters" 
        });
    }

    try {
        // Generate password hash and salt
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: passwordHash,
            role
        });

        // Generate a JWT token
        const maxAge = 3 * 60 * 60; // 3 hours
        const token = jwt.sign(
            { id: user._id, username, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: maxAge }
        );

        // Set the JWT token as a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // Convert to milliseconds
        });

        res.status(200).json({
            message: "User created successfully",
            user: user._id,
        });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            if (error.keyValue && error.keyValue.username) {
                res.status(500).json({
                    message: "Username already exists. Please choose a different username."
                });
            } else if (error.keyValue && error.keyValue.email) {
                res.status(500).json({
                    message: "Email already exists. Please use a different email."
                });
            } else {
                res.status(500).json({
                    message: "User not created successfully",
                    error: error.message,
                });
            }
        } else {
            res.status(500).json({
                message: "User not created successfully",
                error: error.message,
            });
        }
    }
};

//Login User
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email not found",
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "Password not found",
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Login not successful",
                error: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );

            // Set the JWT token as a cookie
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // Convert to milliseconds
            });

            return res.status(200).json({
                message: "Login successful",
                user,
            });
        } else {
            return res.status(401).json({
                message: "Login not successful",
                error: "Invalid password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};



//Update User role to Basic or Admin
export const updateUser = async (req, res, next) => {
    const { role, id } = req.body;

    // Verify if role and id are present
    if (!id) {
        return res.status(400).json({ message: "ID is Required" });
    }
    else if (!role){
        return res.status(400).json({message: "Role is Required "})
    }

    try {
        // Verify if role is admin
        if (role === 'admin') {
            // Find user with id
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.role !== "admin") {
                user.role = role;
                await user.save();
                return res.status(201).json({
                    message: "Update successful",
                    user
                });
            } else {
                return res.status(400).json({
                    message: "User is already an admin"
                });
            }
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

//delete user 
export const deleteUser = async (req, res, next) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({
            message: "user id is required "
        })
          }
          try {
            const user = await User.findById(id);
            
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            await User.deleteOne({ _id: id });
    
            return res.status(200).json({
                message: "User deleted successfully",
                user
            });
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
                error: error.message
            });
        }      
    }



