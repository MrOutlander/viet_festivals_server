import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userSurname: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                // Regular expression for basic email validation
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    dateOfBirth: {
        type: Date,
        required: false, // Not mandatory
        default: null,
    },
    avatar: {
        type: String,
        required: false, // Not mandatory
        default: null,
    },
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.model('Users', userSchema);

export default User;