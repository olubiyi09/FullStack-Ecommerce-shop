import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // Item that already exist in the cart
        // Increase the cart quantity for the item
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increase by one`, {
          position: "top-left",
        });
      } else {
        // Item that does not already exist in the cart
        // Add item to the cart
        const temporaryProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temporaryProduct);
        toast.info(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }

      // Save cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decrease by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.info(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.info(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart has been cleared`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUB_TOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      // this will add all the total price in the array together
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });

      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
      // console.log(state.cartTotalQuantity);
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
