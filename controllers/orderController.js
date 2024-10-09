const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrderController = async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in rupees

    // Convert rupees to paise in the backend
    const options = {
      amount: amount * 100, // Amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`, // Unique receipt id
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send({
        success: false,
        message: "Some error occurred while creating Razorpay order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).send({
      success: false,
      message: "Error creating Razorpay order",
      error,
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product || product.status !== "available") {
      return res.status(400).send({
        success: false,
        message: "Product is not available.",
      });
    }

    // Create new order
    const order = new Order({
      product: productId,
      buyer: req.user.userId,
    });

    await order.save();

    // Set product status to pending
    product.status = "pending";
    await product.save();

    return res.status(201).send({
      success: true,
      message: "Order placed successfully and pending admin approval.",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error placing order",
      error,
    });
  }
};

const approveRejectOrderController = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only admins can approve or reject orders.",
      });
    }

    const order = await Order.findById(orderId).populate("product").populate({
      path: "buyer",
      select: "name organisationName", // Select both fields
    });

    if (!order || order.status !== "pending") {
      return res.status(404).send({
        success: false,
        message: "Order not found or is not pending",
      });
    }

    // Update order status
    order.status = status;
    await order.save();

    if (status === "approved") {
      order.product.status = "sold";
      await order.product.save();
    } else if (status === "rejected") {
      order.product.status = "available";
      await order.product.save();
    }

    return res.status(200).send({
      success: true,
      message: `Order ${status} successfully`,
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error updating order status",
      error,
    });
  }
};

const getUserPurchasesController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ buyer: userId }).populate("product");

    return res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching purchases",
      error,
    });
  }
};

module.exports = {
  placeOrderController,
  approveRejectOrderController,
  getUserPurchasesController,
  createRazorpayOrderController,
};
