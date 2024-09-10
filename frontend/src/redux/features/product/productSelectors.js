import { createSelector } from 'reselect';

// Input selector: gets the part of the state that contains products
const selectProductsState = (state) => state.products;

// Memoized selector to get all products
export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.products || []
);

// Memoized selector to get products by availability status
export const selectAvailableProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter(product => product.status === 'available')
);

// Memoized selector for loading state
export const selectProductsLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading
);

// Memoized selector for error state
export const selectProductsError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);
