import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedProducts } from "../redux/features/product/productSlice";
import {
  selectPurchasedProducts,
  selectProductsLoading,
  selectProductsError,
} from "../redux/features/product/productSelectors";
import "./PurchasedProductsSidebar.css";
import { toast } from 'react-toastify';

const PurchasedProductsSidebar = () => {
  const dispatch = useDispatch();
  const purchasedProducts = useSelector(selectPurchasedProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [showProducts, setShowProducts] = useState(false); // State to toggle visibility

  useEffect(() => {
    dispatch(fetchPurchasedProducts());
  }, [dispatch]);

  // Toggle function
  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const handlePayment = () => {
    toast.success("Payment made successfully!");
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <p className="error-message">Error fetching purchased products</p>;
  }

  return (
    <div className="sidebar">
      <h2>Purchased Products</h2>
      <button className="toggle-button" onClick={toggleShowProducts}>
        {showProducts ? "Hide Purchased Products" : "Show Purchased Products"}
      </button>

      {showProducts && (
        <ul className="product-list">
          {purchasedProducts.length === 0 ? (
            <p>No products purchased yet.</p>
          ) : (
            purchasedProducts.map((order) => (
              <li key={order._id} className="product-item">
                {order.product ? (
                  <>
                    <h3>{order.product.productName}</h3>
                    <p>Status: {order.status}</p>
                    <p>Price: ${order.product.price}</p>
                    <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    {order.status === 'approved' ? (
                      <button 
                        className="payment-button" 
                        onClick={() => handlePayment(order._id)}
                      >
                        Make Payment
                      </button>
                    ) : (
                      <button 
                        className="payment-button" 
                        disabled
                        style={{ backgroundColor: order.status === 'rejected' ? 'red' : 'gray' }}
                      >
                        {order.status === 'rejected' ? 'Order Rejected' : 'Pending Approval'}
                      </button>
                    )}
                  </>
                ) : (
                  <p>Product details not available.</p>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default PurchasedProductsSidebar;
