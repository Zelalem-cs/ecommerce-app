import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  total: 0,
  totalQuantity: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      let setState = false;
      state.loading = true;
      state.product.length !== 0 &&
        (state.product = state.product.map((product) => {
          if (product.id === action.payload.id) {
            if (
              JSON.stringify(product.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
            ) {
              setState = true;
              action.payload?.prices?.forEach((price) => {
                if (price.currency.symbol === JSON.parse(localStorage.currency)) {
                  state.total += price.amount;
                }
              });
              state.totalQuantity += 1;
              return { ...product, quantity: product.quantity + 1 };
            }
          }

          return product;
        }));
      !setState && (state.product = [...state.product, action.payload]);

      !setState &&
        action.payload?.prices?.forEach((price) => {
          if (price.currency.symbol === JSON.parse(localStorage.currency)) {
            state.total += price.amount;
          }
        });
      !setState && (state.totalQuantity += 1);
      state.loading = false;
    },
    updateProductAttributeInCart: (state, action) => {
      state.product = state.product.map((product) => {
        if (product.id === action.payload.id) {
          const attributes = product.selectedAttributes.map((attribute) => {
            if (attribute.name === action.payload.name)
              return { name: attribute.name, value: action.payload.value };
            return attribute;
          });
          return { ...product, selectedAttributes: attributes };
        }
        return product;
      });
    },
    removeProductFromCart: (state, action) => {
      if (action.payload.quantity > 1) {
        state.product = state.product.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        action.payload.prices.forEach((price) => {
          if (price.currency.symbol === JSON.parse(localStorage.currency)) {
            console.log("price", price.amount);
            state.total -= price.amount;
            state.totalQuantity -= 1;
          }
        });
      } else {
        state.product.forEach((product) => {
          if (product.id === action.payload.id) {
            if (
              JSON.stringify(product.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
            ) {
              product.prices.forEach((price) => {
                if (price.currency.symbol === JSON.parse(localStorage.currency)) {
                  console.log("price", price.amount);
                  state.total -= price.amount;
                  state.totalQuantity -= 1;
                }
              });
            }
          }
        });
        state.product = state.product.filter(
          (items) =>
            items.id !== action.payload.id ||
            JSON.stringify(items.selectedAttributes) !==
              JSON.stringify(action.payload.selectedAttributes)
        );
      }
    },
    calculateTotal: (state) => {
      state.product.forEach((item) =>
        item.prices.forEach((price) => {
          if (price.currency.symbol === JSON.parse(localStorage.currency))
            state.total += price.amount;
        })
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const selectProduct = (state) => state.product;
export const {
  setCart,
  removeProductFromCart,
  calculateTotal,
  updateProductAttributeInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
