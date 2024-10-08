import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
       minlength: 6,
        required: true
    },
    role: {
        type: String,
        dafault: "Basic",
        required: true,
    },

})

const User = mongoose.model("User", UserSchema);

export default User
