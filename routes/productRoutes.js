const express = require('express');
const router= express.Router();
const productController = require('../controllers/productController');
const checkUser = require('../middleware/authCheck');
const checkFile =require('../middleware/filecheck');



router.get('/',productController.getAllProduct);
router.post('/api/create-product',checkUser.adminCheck, checkFile.fileCheck, productController.createProduct);
// Params
router.get('/product/:id',productController.getProductById);
router.patch('/api/update-product/:id',checkUser.adminCheck, checkFile.updateCheck, productController.updateProduct);
router.delete('/api/remove-product/:id',checkUser.adminCheck, productController.removeProduct);

module.exports = router;