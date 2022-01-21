const express = require('express');
const { create, getOne, getAll, deleteOne, editOne } = require('../controllers/productController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path')

const router = new express.Router();



// const storage = multer.diskStorage({
//     destination: path.join(path.join(__dirname, '../../frontend/public/images/products')),
//     filename: function (req, file, cb) {
//         let original = file.originalname;
//         let sada = new Date();
//         let datePart = '';
//             datePart += sada.getFullYear().toString();
//             datePart += (sada.getMonth() + 1).toString();
//             datePart += sada.getHours().toString();
//             datePart += sada.getTime();
//         let filename = datePart + '-' + original;
//         cb(null, filename)
//     }
// })



// const upload = multer({
//     storage: storage,
//     limits: {
//         files: 1,
//         fileSize: 1000000 // 1mb
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png)/)) {
//             return cb(new Error('Please upload valid image format.'));
//         }
//         cb(null, true);
//     },
// })



router.post('/create', isAuth, authorizeRoles,  create);
router.get('/', getAll);
router.get('/:id', getOne);
router.delete('/:id', isAuth, authorizeRoles, deleteOne);
router.patch('/edit', isAuth, authorizeRoles, editOne)

module.exports = router;