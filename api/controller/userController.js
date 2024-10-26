const User = require('../models/userModels');

const createNewUser = async (req, res) => {
    try {
        const { emailOrPhone, username, password } = req.body;
        if(!emailOrPhone || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({
            $or: [
                { emailOrPhone},
                { username},
            ]
        });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
        console.log(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await findUser.matchPassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json(findUser);
        console.log('login successful');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { createNewUser, getAllUsers, loginUser }