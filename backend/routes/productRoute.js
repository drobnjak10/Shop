const express = require('express');
const { create, getOne, getAll } = require('../controllers/productController');
const { isAuth, authorizeRoles } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path')

const router = new express.Router();
const _dirname = path.resolve(path.dirname(''));


const storage = multer.diskStorage({
    destination: path.join(_dirname, '../front/public/images/products/'),
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
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            return cb(new Error('Please upload valid image format.'));
        }
        cb(null, true);
    }
})

router.post('/create', isAuth, authorizeRoles, upload.single('avatar'), create);
router.get('/', getAll);
router.get('/:id', getOne);

module.exports = router;