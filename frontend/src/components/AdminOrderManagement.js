import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../redux/features/orders/orderSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminOrderManagement.css'; // Import the CSS for styling

const AdminOrderManagement = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ orderId, status }))
            .then(() => {
                toast.success(`Order ${orderId} has been ${status}`);
            })
            .catch(() => {
                toast.error('Failed to update order status');
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <p className="error-message">Error loading orders: {error}</p>;

    return (
        <div className="admin-order-management">
            <h1>Order Management</h1>
            <div className="order-cards">
                {orders.map(order => (
                    <div key={order._id} className="order-card">
                        <h3>Order ID: {order._id}</h3>
                        <p>Product: {order.product?.productName || 'Unknown'}</p>
                        <p>Buyer: {order.buyer?.name || 'Unknown'}</p>
                        <p>Status: {order.status}</p>
                        {order.status === 'pending' && (
                            <div className="order-actions">
                                <button
                                    className="approve-button"
                                    onClick={() => handleStatusChange(order._id, 'approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={() => handleStatusChange(order._id, 'rejected')}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrderManagement;
