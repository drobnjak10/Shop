const Subcategory = require("../models/Subcategory.js");

exports.create = async (req,res) => {
    try {
        const { name, category } = req.body;

        const subcategory = new Subcategory(req.body);

        await subcategory.save();

        res.json({ message: "Category added successfully.", subcategory })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAll = async (req,res) => {
    try {
        const subcategories = await Subcategory.find({}).populate('category');

        res.json({ subcategories });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}