const express = require('express');
const dotenv = require('dotenv'); //for loading environment variables from a .env file in the root directory of your project.
const color = require('colors'); //for adding color to text in terminal window.
const morgan = require('morgan'); //for logging requests made by clients accessing your API endpoints.
const cors = require('cors'); //for enabling CORS (Cross-Origin Resource Sharing) requests made by clients accessing your API endpoints.
const connectDB = require('./config/db');
const path = require("path");
//configure dotenv module to load environment variables from a .env file in the root directory of your project.
dotenv.config({path:'.env'})

// mongoDB connection
connectDB();

//rest module
const app = express();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// add routes
// 1 test routes
app.use("/api/v1/auth", require('./routes/authRoutes'));

//route for product
app.use("/api/v1/products", require('./routes/productRoutes'));

//route for place order and reject or approved the order by admin
app.use("/api/v1/orders", require('./routes/orderRoutes'));

app.use('/api/v1/orders', require('./routes/paymentRoutes'));

// add port
const PORT = process.env.PORT || 8080; //port number for the server to listen on.

// listen
app.listen(PORT, () => console.log(
    `Server is running in ${process.env.DEV_MODE} at http://localhost:${process.env.PORT || 8080}`
    .bgBlue.white
));

