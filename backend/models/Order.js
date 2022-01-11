const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        avatar: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    shippingAddress: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    }],
    paymentMethod: { type: String, enum: ['CreditCard', 'PayPal', 'Cash'], required: true, default: 'CreditCard' },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;