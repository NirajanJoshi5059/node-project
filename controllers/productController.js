const Product = require('../model/Product');


module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



module.exports.createProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock

  } = req.body;
  try {

    await Product.create({
      product_name,
      product_detail,
      product_price,
      brand,
      category,
      countInStock,
      product_image: req.product_image
    });

    return res.status(200).json({
      status: 'success',
      message: `Successfully Add Product`
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


module.exports.updateProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,
    oldImagePath,

  } = req.body;
  try {
    if (req.product_image) {
      await Product.findByIdAndUpdate({ _id: req.params.id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,
        product_image: req.product_image
      });
    }
    else {
      await Product.create({
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,
      });
    }


    return res.status(200).json({
      status: 'success',
      message: `Successfully Add Product`
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}