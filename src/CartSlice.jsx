import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload || {};
      const name = incoming.name;
      if (!name) return;
      const existing = state.items.find((it) => it.name === name);
      if (existing) {
        const inc = typeof incoming.quantity === 'number' ? incoming.quantity : 1;
        existing.quantity = (existing.quantity || 0) + inc;
      } else {
        const qty = typeof incoming.quantity === 'number' ? incoming.quantity : 1;
        state.items.push({ ...incoming, quantity: qty });
      }
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;
      state.items = state.items.filter((it) => it.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload || {};
      if (!name || typeof quantity !== 'number') return;
      const item = state.items.find((it) => it.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
