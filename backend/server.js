const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./routes/userRoute.js');
const categoryRouter = require('./routes/categoryRoute.js');
const subcategoryRouter = require('./routes/subcategoryRoute.js');
const productRouter = require('./routes/productRoute.js');
const orderRouter = require('./routes/orderRoute.js');
const cors = require('cors')
const path = require('path');


dotenv.config({
    path: './backend/config/config.env'
});

const _dirname = path.resolve(path.dirname(''));


const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

const PORT = process.env.PORT;

console.log(__dirname);

app.use(express.static(path.join(_dirname,'../front/public/images')));
app.use(express.json());
// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cookieParser());


app.use(cors({
    origin: ['*']
}))
app.get('/', (req,res) => {
    // console.log(req.cookies.access_token);
    res.send('Hello');
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', subcategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);


app.listen(PORT, () => console.log('Server is up on port:', PORT));


