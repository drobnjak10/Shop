const Product = require("../models/Product");
const multer = require('multer');
const path = require("path");
const _dirname = path.resolve(path.dirname(''));
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
        const products = await Product.find().populate('category').exec();

        res.json({ products })
    } catch (error) {
        res.json({ error: error.message })
    }
}

exports.deleteOne = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        await product.delete()

        res.json({ message: 'Product deleted.', product })
    } catch (error) {
        res.json({error: error.message});
    }
}