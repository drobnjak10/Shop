const express = require('express');
const { register, login, logout, myProfile } = require('../controllers/userController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');

const router = new express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuth, logout);
router.get('/me', isAuth, myProfile);

module.exports = router;