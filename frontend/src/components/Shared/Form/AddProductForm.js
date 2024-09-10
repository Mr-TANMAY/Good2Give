import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProduct } from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./AddProductForm.css"; // Import CSS

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    discountedPrice: "",
    expiryDate: "",
    quantity: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8080/api/v1/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(addProduct(response.data)); 
        setIsSubmitting(false);
        setShowForm(false); // Hide form after submission
      })
      .catch((error) => {
        console.error("Error adding product:", error.response?.data);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-product-container">
      <button className="sell-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Sell a Product"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            name="productName"
            placeholder="Enter Product Name..."
            value={formData.productName}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="description"
            placeholder="Enter Product Description..."
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter Product MRP..."
            value={formData.price}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="discountedPrice"
            placeholder="Enter Discounted Price..."
            value={formData.discountedPrice}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity..."
            value={formData.quantity}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
