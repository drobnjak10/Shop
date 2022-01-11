const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');


const router = new express.Router();

router.post('/create', isAuth, createOrder);

module.exports = router;