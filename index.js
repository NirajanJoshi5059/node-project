const express = require('express');
const morgan = require('morgan');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');


// fullname : Nirajan Joshi  email : nirajanjoc19@gmail.com noc5059
mongoose.connect('mongodb+srv://Nirajan:noc8946@cluster0.eanf0ua.mongodb.net/Shopy').then((data)=>{
    app.listen(5000);
}).catch((err)=>{
    console.log(err);
});

app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(fileUpload({
    limits: {fileSize : 50*1024*1024},
    abortOnLimit :true,
    createParentPath: true
}));

app.use(productRoutes);
app.use(authRoutes);

// app.get('/', (req, res)=>{
//     // return res.status(200).send("Hello Node...");
//     return res.status(200).sendFile("./index.html", {root:__dirname});
// });


// middleware
app.use((req, res)=>{
    return res.status(404).json({
        status:"error",
        message:"NOT FOUND"
    });
});