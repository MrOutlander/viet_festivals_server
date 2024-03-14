import User from '../mongodb/models/users.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist!' });
        }

        // Assuming you're hashing passwords; you'd use a library like bcrypt to compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Login credentials are incorrect' });
        }

        // Generate token; implement this based on your auth strategy
        const token = generateToken(user);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    loginUser,
}