const Order = require('../models/orderModel');
const Product = require('../models/productModel');


const placeOrderController = async (req, res) => {
    try {
        const { productId } = req.body; 
        //check if product exits in db
        const product = await Product.findById(productId);
        if(!product || product.status !== 'available'){
            return res.status(400).send({
                success: false,
                message: 'product is not available.',
            });
        }

        //create new order
        const order = new Order({
            product: productId,
            buyer: req.user.userId
        });

        await order.save();

        //set product status to pending
        product.status = 'pending';
        await product.save();

        return res.status(201).send({
            success: true,
            message: 'Order placed successfully and pending admin approval.',
            order,
        });
    } catch (error) {
        console.log(error);
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error placing order',
            error,
        })  
    }
};

const approveRejectOrderController = async(req, res) => {
    try {
        const {orderId, status} = req.body;

        // check if user is admin

        if(req.user.role !== 'admin'){
            return res.status(403).send({
                success: false,
                message: "Only admins can approve or reject orders,"
            });
        }

        //Find the order and ensure its pending

        const order = await Order.findById(orderId).populate('product');
        if(!order || order.status  !== 'pending'){
            return res.status(404).send({
                success: false,
                message: "Order not fond or is not pending",
            });
        }

        //update order status
        order.status  = status;
        await order.save();

        //if approved mark product as sold
        if(status ===  'approved'){
            order.product.status = 'sold';
            await order.product.save();
        } else if (status === 'rejected'){
            order.product.status = 'available';
            await order.product.save();
        }

        return res.status(200).send({
            success:true,
            message: `Order ${status} successfully`
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error updating order status",
            error,
        })
    }
};

module.exports = { placeOrderController, approveRejectOrderController };