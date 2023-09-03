const express = require('express');
const morgan = require('morgan');
const app = express();
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Nirajan:noc8946@cluster0.eanf0ua.mongodb.net/Shopy').then((data)=>{
    app.listen(5000);
}).catch((err)=>{
    console.log(err);
});


app.use(morgan('dev'));

app.use(productRoutes);

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