const Order = require("../models/Order.js");

exports.createOrder = async (req, res) => {
    try {

        const items = req.body.orderItems;

        console.log(items)
        
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })

        const createdOrder = await order.save();

        res.json({ message: 'New Order Created', order: createdOrder });
    } catch (error) {
        res.json({ error: error.message })
    }
}