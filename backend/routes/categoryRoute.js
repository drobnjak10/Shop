const express = require('express');
const { create, getAll } = require('../controllers/categoryController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');

const router = new express.Router();

router.post('/create', isAuth, authorizeRoles, create);
router.get('/', getAll);
// router.post('/login', login);
// router.get('/all', isAuth, logout);

module.exports = router;