const path = require('path');
const fs = require('fs');

module.exports.fileCheck = (req, res, next) => {
    // console.log(req.files?.product_image);
    if (req.files?.product_image) {
        const file = req.files.product_image;
        const validExts = ['.jpg', '.jpeg', '.png'];

        if (validExts.includes(path.extname(file.name))) {
            file.mv(`./uploads/${file.name}`, (err) => {
                if (err) {

                }
                req.product_image = `/uploads/${file.name}`;
                return next();
            });
        }
        else {
            return res.status(400).json({
                status: 'error',
                message: 'Please Provide Valid Image'
            });
        }
        // console.log(validExts.includes(path.extname(file.name)));     
    }
    else {
        return res.status(400).json({
            status: 'error',
            message: `Image required`
        })
    }

}

module.exports.updateCheck = (req, res, next) => {
    // console.log(req.files?.product_image);
    if (req.files?.product_image && req.body?.imagePath) {
        const file = req.files.product_image;
        const validExts = ['.jpg', '.jpeg', '.png'];

        if (validExts.includes(path.extname(file.name))) {
            file.mv(`./uploads/${file.name}`, (err) => {
                if (err) {

                }
                fs.unlink(`.${req.body.imagePath}`, (err) => {
                    
                })
                req.product_image = `/uploads/${file.name}`;
                return next();
            });
        }
        else {
            return res.status(400).json({
                status: 'error',
                message: 'Please Provide Valid Image'
            });
        }
        // console.log(validExts.includes(path.extname(file.name)));     
    }
    else {
        next();
    }

}