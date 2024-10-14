import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedProducts } from "../redux/features/product/productSlice";
import {
  selectPurchasedProducts,
  selectProductsLoading,
  selectProductsError,
} from "../redux/features/product/productSelectors";
import { selectUser } from "../redux/features/auth/authSelectors";
import "./PurchasedProductsSidebar.css";
import { toast } from "react-toastify";

const PurchasedProductsSidebar = () => {
  const dispatch = useDispatch();
  const purchasedProducts = useSelector(selectPurchasedProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const user = useSelector(selectUser);

  const [showProducts, setShowProducts] = useState(false); // State to toggle visibility
  const [paidOrders, setPaidOrders] = useState({}); // Track paid status for each order

  useEffect(() => {
    dispatch(fetchPurchasedProducts());
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Load the paid orders from localStorage on component mount
  useEffect(() => {
    const storedPaidOrders = JSON.parse(localStorage.getItem("paidOrders")) || {};
    setPaidOrders(storedPaidOrders);
  }, []);

  // Toggle function
  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const handlePayment = async (orderId, amount) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated. Please log in.");
        return;
      }

      // Make API call to backend to create a Razorpay order
      const response = await fetch(
        "http://localhost:8080/api/v1/orders/create-razorpay-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token here
          },
          body: JSON.stringify({ amount }), // Pass the amount in paise
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(`Failed to create Razorpay order: ${errorResponse.message}`);
        return;
      }

      const data = await response.json();
      const { order } = data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: user?.name || user?.organisationName || "Your Company Name",
        description: "Product Payment",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment made successfully!");

          // Update the state to reflect payment success for the specific order
          setPaidOrders((prev) => {
            const updatedPaidOrders = { ...prev, [orderId]: true };

            // Persist the paid orders in localStorage
            localStorage.setItem("paidOrders", JSON.stringify(updatedPaidOrders));

            return updatedPaidOrders;
          });

          // Re-fetch the purchased products to update the status if needed
          await dispatch(fetchPurchasedProducts());
        },
        prefill: {
          name: user?.name || "Customer Name",
          email: user?.email || "customer@example.com",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        toast.error("Payment failed. Please try again.");
      });
    } catch (error) {
      console.error("Error initiating payment", error);
      toast.error("Error initiating payment");
    }
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
                    <p>Price: ₹{order.product.discountedPrice}</p>
                    <p>
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    {order.status === "approved" ? (
                      paidOrders[order._id] ? (
                        <button className="payment-button done">
                          Payment Done
                        </button>
                      ) : (
                        <button
                          className="payment-button"
                          onClick={() =>
                            handlePayment(order._id, order.product.discountedPrice)
                          }
                        >
                          Make Payment
                        </button>
                      )
                    ) : (
                      <button
                        className="payment-button"
                        disabled
                        style={{
                          backgroundColor:
                            order.status === "rejected" ? "red" : "gray",
                        }}
                      >
                        {order.status === "rejected"
                          ? "Order Rejected"
                          : "Pending Approval"}
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
