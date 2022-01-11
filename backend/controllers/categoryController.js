const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

exports.create = async (req,res) => {
    try {
        const { name } = req.body;

        const category = new Category(req.body);

        await category.save();

        res.json({ message: "Category added successfully.", category })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAll = async (req,res) => {
    try {
        const categories = await Category.find({});
        const subcategories = await Subcategory.find({});

        const categoryList = [];

        for(let cat of categories) {
            categoryList.push({
                    category:{
                        _id: cat._id,
                        name: cat.name,
                        subcategories: await Subcategory.find({ category: cat._id })
                    }
            });
        }


        res.json({ categories: categoryList });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}