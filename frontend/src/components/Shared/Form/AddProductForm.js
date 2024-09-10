import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProduct } from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    discountedPrice: "",
    expiryDate: "",
    quantity: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submission
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8080/api/v1/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use backticks to handle string interpolation
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        console.log("Product added successfully:", response.data);
        dispatch(addProduct(response.data)); // Add product to Redux store
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error.response?.data);
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="productName"
        placeholder="Enter Product Name..."
        value={formData.productName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Enter Product Description..."
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Enter Product MRP..."
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="discountedPrice"
        placeholder="Enter Product discounted Price..."
        value={formData.discountedPrice}
        onChange={handleChange}
      />
      <input
        type="date"
        name="expiryDate"
        placeholder="Enter Product expiry date..."
        value={formData.expiryDate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Enter Product Quantity..."
        value={formData.quantity}
        onChange={handleChange}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
