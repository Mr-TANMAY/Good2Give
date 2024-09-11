const Product = require("../models/productModel");
const userModel = require("../models/userModel");

const addProductController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);

    //only hotels or stores can add products
    if (user.role !== "hotel" && user.role !== "stores") {
      return res.status(403).send({
        success: false,
        message: "Only hotels or stores can add products.",
      });
    }

    const product = new Product({
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      expiryDate: req.body.expiryDate,
      quantity: req.body.quantity,
      listedBy: req.user.userId,
    });

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error  while adding product",
      error,
    });
  }
};

//Get products (visible to user and organization)
const getProductsController = async (req, res) => {
  try {
    // Fetch products where status is 'available'
    const products = await Product.find({ status: "available" });

    return res.status(200).send({
      success: true,
      message: "Available products retrieved successfully.",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching products",
      error,
    });
  }
};

// Fetch products added by the current user
const getUserProductsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProducts = await Product.find({ listedBy: userId });

    res.status(200).send({
      success: true,
      message: "User products retrieved successfully.",
      products: userProducts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching user products",
      error,
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Ensure the product exists and the current user listed it
    if (!product || product.listedBy.toString() !== userId) {
      return res.status(403).send({
        success: false,
        message: "You can only delete your own products.",
      });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting product.",
      error,
    });
  }
};

module.exports = { 
  addProductController, 
  getProductsController, 
  getUserProductsController, 
  deleteProductController // Added delete controller export
};



