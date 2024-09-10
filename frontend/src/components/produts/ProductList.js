import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/product/productSlice";
import { selectAvailableProducts, selectProductsLoading, selectProductsError } from "../../redux/features/product/productSelectors";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css'; // Import the CSS for styling

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAvailableProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBuyProduct = (productId) => {
    const token = localStorage.getItem('token');
    axios
      .post("http://localhost:8080/api/v1/orders/place", 
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        dispatch(fetchProducts());
        toast.success("Product purchased successfully and waiting for admin approval!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error purchasing product. Please try again.");
      });
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <p className="error-message">Error fetching products</p>;
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-heading">Available Products</h1>
      <div className="product-cards">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.productName}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discounted Price: ${product.discountedPrice}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Expiry Date: {new Date(product.expiryDate).toDateString()}</p>
            <p>Status: {product.status}</p>
            {product.status === "available" && (
              <button
                className="buy_button"
                onClick={() => handleBuyProduct(product._id)}
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
