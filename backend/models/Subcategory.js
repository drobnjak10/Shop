const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter subcategiry name."], trim: true, unique: true },
    category: { 
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;