const express = require('express');
const { createNewUser, getAllUsers, loginUser } = require('../controller/userController');
const router = express.Router();

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);

module.exports = router