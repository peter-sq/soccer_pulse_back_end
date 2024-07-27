import User from '../models/Users.js'

//Register a User
export const registerUser = async (req, res, next) => {
    const { username, email, password, role } = req.body;

      // Check if all required fields are present
      if (!email) {
        return res.status(400).json({ 
            message: "Email is Required" });
    }
    else if (!password){
        return res.status(400).json({
            message: "password must not be empty"
        })
    }
    else if (password.length < 6) {
        return res.status(400).json({ 
            message: "Password must be greater than 6 characters" 
        });
    }

    try {
        const user = await User.create({
            username,
            email,
            password,
            role
        });
        res.status(200).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "User not created successfully",
            error: error.message,
        });
    }
};

//Login User

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
  
  
    if (!email || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    try {
        const user = await User.findOne({email, password});
        if(!user){
            res.status(401).json({
                message: "Login not Successful",
                error: "user not found"
            })
        } else 
            res.status(200).json({
            message: "Login Successfull",
            user,
        })
        
    } catch (error) {
        res.status(400).json({
            message:"An Error Occur",
            error:error.message,
        })
        
    }
}

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



