import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const temporaryProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = temporaryProducts;
    },

    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let temporaryProducts = [];

      if (sort === "latest") {
        temporaryProducts = products;
      }
      if (sort === "lowest-price") {
        temporaryProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        temporaryProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        temporaryProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        temporaryProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = temporaryProducts;
    },

    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let temporaryProducts = [];
      if (category === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.category === category
        );
      }

      state.filteredProducts = temporaryProducts;
    },

    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let temporaryProducts = [];
      if (brand === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.brand === brand
        );
      }

      state.filteredProducts = temporaryProducts;
    },

    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let temporaryProducts = [];
      temporaryProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = temporaryProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProduct = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
