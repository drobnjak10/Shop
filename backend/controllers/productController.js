const Product = require("../models/Product");
const multer = require('multer');
const upload = multer({
    // dest:'avatars',
    limits: {
        fileSize: 1000000 // 1mb 
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            return cb(new Error('Please upload image.'));
        }

        cb(undefined, true);
    }
});

exports.create = async (req,res) => {
    try {
        const product = new Product();
        // const avatar = req.file.avatar;

        product.name = req.body.name
        product.price = req.body.price
        product.stock = req.body.stock
        product.description = req.body.description
        product.category = req.body.category
        product.avatar = req.file.filename
        
        console.log(req);
        console.log(req.body);
        console.log(req.file);
        

        const savedProduct = await product.save();
    
        if(!savedProduct) {
            fs.unlinkSync(req.file.filepath);
        }

        res.json({ message: "Product successfully created.", savedProduct })
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getOne = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        res.json({product});
    } catch (error) {
        res.json({ error: error.message });
    }
}

exports.getAll = async (req,res) => {
    try {
        const products = await Product.find().populate('category').exec();

        res.json({ products })
    } catch (error) {
        res.json({ error: error.message })
    }
}