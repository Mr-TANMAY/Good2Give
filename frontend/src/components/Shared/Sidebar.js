import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../../redux/features/product/productSlice';
import './Sidebar.css'; // Add styles for the sidebar

const Sidebar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const { userProducts, status, error } = useSelector((state) => state.products);
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProducts(userId));
    }
  }, [dispatch, userId]);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sidebar">
      <h2>Your Product History</h2>
      <button className="toggle-button" onClick={toggleHistory}>
        {showHistory ? "Hide History" : "Show History"}
      </button>
      {showHistory && (
        <ul className="product-list">
          {userProducts.length === 0 ? (
            <li>No products found</li>
          ) : (
            userProducts.map((product) => (
              <li key={product._id} className="product-item">
                <strong>{product.productName}</strong> - {product.status === 'sold' ? 'Sold' : 'Available'}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
