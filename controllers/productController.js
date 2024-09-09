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

module.exports = { addProductController, getProductsController };
