const express = require('express');
const { create, getAll } = require('../controllers/subcategoryController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');

const router = new express.Router();

router.post('/create', isAuth, authorizeRoles, create);
router.get('/', isAuth, getAll)

module.exports = router;