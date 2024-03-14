import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id, // Essential for identifying the user
        username: user.username, // Useful for display purposes
        userSurname: user.userSurname, // Useful for display purposes
        email: user.email, // Useful for display and contact purposes
        dob: user.dateOfBirth,
        avatar: user.avatar,
    }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    });
};

export {
    generateToken,
}