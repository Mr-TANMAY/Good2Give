import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/product/productSlice";
import { selectAvailableProducts, selectProductsLoading, selectProductsError } from "../../redux/features/product/productSelectors";
import axios from 'axios';
const ProductList = () => {
  const dispatch = useDispatch();
  // Getting available products, loading state, and error from redux store using memoized selectors
  const products = useSelector(selectAvailableProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  console.log('Products:', products);

  // Fetch products when the component is mounted
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBuyProduct = (productId) => {
    axios
      .post("http://localhost:8080/api/v1/orders/place", { productId })
      .then(() => {
        //product is sold so refetch products to update the list
        dispatch(fetchProducts());
      })
      .catch((error) => console.log(error));
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <p> Error fetching products </p>
  }

  return (
    <div>
      <h1>available Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
