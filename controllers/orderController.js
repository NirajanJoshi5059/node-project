const Order = require('../model/Order');


module.exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}

module.exports.getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.findById({ user: req.userId });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}

module.exports.addOrder = async (req, res) => {
  const {
    name,
    image,
    qty,
    price,
    product } = req.body
  try {
    await Order.create({
      name,
      image,
      qty,
      price,
      product
    });
    return res.status(200).json({
      status: 'success',
      message: `Successfully Order`
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}

