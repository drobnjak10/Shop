const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter product name."], trim: true },
    price: { type: Number, required: true },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
        required: true
    },
    sale: { type: String, enum: ['action', 'normal', 'new'], default: 'normal' },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    // images: [{
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // }],
    avatar: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;