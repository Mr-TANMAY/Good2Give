import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProduct } from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import "react-toastify/dist/ReactToastify.css";
import "./AddProductForm.css"; // Import CSS

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    productName: "",
    description: "",
    price: "",
    discountedPrice: "",
    expiryDate: "",
    quantity: "",
    pincode: "",   // New field for pincode
    address: "",   // New field for address
  });

  const [imageFile, setImageFile] = useState(null); // For image upload
  const [cameraImage, setCameraImage] = useState(null); // For image captured from camera
  const [useCamera, setUseCamera] = useState(false); // Toggle between camera and file input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const dispatch = useDispatch();

  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Capture the image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("Failed to capture image.");
    } else {
      setCameraImage(imageSrc); // Set the captured image if successful
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    // Create a FormData object to send the image and other fields
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    if (imageFile) {
      productData.append("image", imageFile); // Add image to the form data
    }

    if (cameraImage) {
      // Convert the camera image (base64) to a Blob and append it to the FormData
      fetch(cameraImage)
        .then((res) => res.blob())
        .then((blob) => {
          productData.append("image", blob, "cameraImage.jpg");
          submitProductData(productData, token);
        });
    } else {
      submitProductData(productData, token); // Submit if only file upload
    }
  };

  const submitProductData = (productData, token) => {
    axios
      .post("http://localhost:8080/api/v1/products/add", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
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
          <div className="image-section">
            <p>Upload Product Image</p>

            {/* Toggle between file upload and camera capture */}
            <div className="image-options">
              <button
                type="button"
                onClick={() => setUseCamera(!useCamera)}
                className="toggle-btn"
              >
                {useCamera ? "Use File Upload" : "Use Camera"}
              </button>
            </div>

            {useCamera ? (
              <div className="camera-section">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="webcam-view"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user", // for front camera
                  }}
                />
                <button
                  type="button"
                  onClick={captureImage}
                  className="capture-btn"
                >
                  Capture Image
                </button>
                {cameraImage && (
                  <img
                    src={cameraImage}
                    alt="Captured"
                    className="preview-image"
                  />
                )}
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            )}
          </div>

          <p>Enter Product Name</p>
          <input
            type="text"
            name="productName"
            placeholder="Enter Product Name..."
            value={formData.productName}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Product Description</p>
          <input
            type="text"
            name="description"
            placeholder="Enter Product Description..."
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Product MRP</p>
          <input
            type="number"
            name="price"
            placeholder="Enter Product MRP..."
            value={formData.price}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Product Discounted Price</p>
          <input
            type="number"
            name="discountedPrice"
            placeholder="Enter Discounted Price..."
            value={formData.discountedPrice}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Product Expiry Date</p>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Product Quantity</p>
          <input
            type="text"
            name="quantity"
            placeholder="Enter Quantity..."
            value={formData.quantity}
            onChange={handleChange}
            className="form-input"
          />    
          <p>Enter Address</p>
          <textarea
            name="address"
            placeholder="Enter Address..."
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
          <p>Enter Pincode</p>
          <input
            type="text"
            name="pincode"
            placeholder="Enter Pincode..."
            value={formData.pincode}
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
