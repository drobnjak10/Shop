const Product = require("../models/Product");
const multer = require('multer');
const path = require("path");
const _dirname = path.resolve(path.dirname(''));
const fs = require('fs');
const ApiFeatures = require("../utils/apiFeatures");
// const upload = multer({
//     // dest:'avatars',
//     limits: {
//         fileSize: 1000000 // 1mb 
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png)/)) {
//             return cb(new Error('Please upload image.'));
//         }



//         cb(undefined, true);
//     },
// });

const storage = multer.diskStorage({
    destination: path.join(path.join(__dirname, '../../frontend/public/images/products')),
    filename: function (req, file, cb) {
        let original = file.originalname;
        let sada = new Date();
        let datePart = '';
        datePart += sada.getFullYear().toString();
        datePart += (sada.getMonth() + 1).toString();
        datePart += sada.getHours().toString();
        datePart += sada.getTime();
        let filename = datePart + '-' + original;
        cb(null, filename)
    }
})



const upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 1000000 // 1mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)/)) {
            return cb(new Error('Please upload valid image format.'));
        }
        cb(null, true);
    },
}).single('avatar')


// app.post('/profile', function (req, res) {
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//       } else if (err) {
//         // An unknown error occurred when uploading.
//       }

//       // Everything went fine.
//     })
//   })

exports.create = async (req, res) => {
    // let isErr = false;
    // upload(req, res, function (err) {
    //     let greska;
    //     if (err instanceof multer.MulterError) {
    //         // A Multer error occurred when uploading.
    //         console.log('err1', err);
    //         greska = err
    //         res.json({error: err.message})

    //     } else if (err) {
    //         // An unknown error occurred when uploading.
    //         console.log(JSON.stringify(err.message));
    //         greska = err.message;
    //         res.json({error: err.message})
    //     }
    // })



    try {
        upload(req, res, async function (err) {
            let greska;
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log('err1', err);
                res.json({ error: err.message })
                return;
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log(JSON.stringify(err.message));
                greska = err.message;
                res.json({ error: err.message })
                return;
            }
            const product = new Product();
            // const avatar = req.file.avatar;
            product.name = req.body.name
            product.price = req.body.price
            product.stock = req.body.stock
            product.description = req.body.description
            product.category = req.body.category
            product.avatar = req.file.filename

            const savedProduct = await product.save();

            if (!savedProduct) {
                fs.unlinkSync(req.file.filepath);
            }

            console.log(savedProduct);

            res.json({ message: "Product successfully created.", savedProduct })
        });
    } catch (error) {
        res.json({ error: error.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        res.json({ product });
    } catch (error) {
        res.json({ error: error.message });
    }
}

exports.getAll = async (req, res) => {
    try {


        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();

        console.log(req.query)

        const apiFeature = new ApiFeatures(Product.find().populate('category'), req.query)
            .search()
            .filter();

        // let products = await Product.find().populate('category').exec();
        let products = await apiFeature.query;

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);

        products = await apiFeature.query.clone();
        // let produkti = await apiFeature.query;
        // if(req.query.cat) {
        //     console.log(req.query.cat)
        //     products = await Product.find({ category: req.query.cat });
        // }


        // if (req.query.cat !== undefined) {
        //     var kats = req.query.cat.split(',')

        //     if (kats.length === 1) {
        //         console.log(req.query.cat)
        //         products = await Product.find({ category: kats[0] });
        //     }

        //     if (kats.length > 1) {
        //         products = await Product.find({ category: { $in: kats } });
        //     }
        // }

        console.log(req.query.keyword);


        res.json({
            products, productsCount,
            resultPerPage,
            filteredProductsCount,
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        const putanja = path.join(__dirname, '../../frontend/public/images/products');
        console.log(putanja)

        await product.delete();

        fs.unlinkSync(`${putanja}/${product.avatar}`);

        res.json({ message: 'Product deleted.', product })
    } catch (error) {
        res.json({ error: error.message });
    }
}


exports.editOne = async (req, res) => {
    try {

        upload(req, res, async function (err) {
            let greska;
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log('err1', err);
                res.json({ error: err.message })
                return;
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log(JSON.stringify(err.message));
                greska = err.message;
                res.json({ error: err.message })
                return;
            }

            const oldProduct = await Product.findById(req.body._id);

            const putanja = path.join(__dirname, '../../frontend/public/images/products');



            console.log(req.file);
            const avatarPath = req.file ? req.file.filename : req.body.avatar
            const product = await Product.findByIdAndUpdate(req.body._id, {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                description: req.body.description,
                category: req.body.category,
                avatar: avatarPath
            }, { new: true });

            console.log(product)
            await product.save();
            fs.unlinkSync(`${putanja}/${oldProduct.avatar}`);

            res.json({ message: "Edited successfully", product })
        });
    } catch (error) {
        res.json({ error: error.message })
    }
}

exports.createReview = async (req, res) => {
    try {
        var product = await Product.findById(req.params.id);
        console.log(req.body)

        if (req.body.stars) {
            product.numReviews += 1;
            product.rating = (product.rating + req.body.stars) / product.numReviews;
        }

        await product.save();
        res.json({ message: 'Thanks for review!' });
    } catch (error) {
        console.log('err')
        res.json({ error: error.message })
    }
}