const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    let totalAmount = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.product} not found` });
      }
      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customer: req.user._id,
      products,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'products.product': { $in: await Product.find({ seller: req.user._id }).select('_id') } })
      .populate('customer', 'username email')
      .populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'username email')
      .populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSellerSales = async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonth },
        },
      },
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $match: {
          'productDetails.seller': req.user._id,
        },
      },
      {
        $group: {
          _id: '$productDetails.seller',
          totalSales: { $sum: { $multiply: ['$products.quantity', '$productDetails.price'] } },
          products: {
            $push: {
              product: '$productDetails',
              quantity: '$products.quantity',
              saleAmount: { $multiply: ['$products.quantity', '$productDetails.price'] },
            },
          },
        },
      },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};