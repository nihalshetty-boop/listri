import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Listing = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  userId: string;
};

type ListingsState = {
  items: Listing[];
};

const initialState: ListingsState = {
  items: [
    {
      id: "l1",
      title: "Bluetooth Speaker",
      price: 45.0,
      imageUrl: "/images/mock/bluetooth.jpg",
      category: "electronics",
      userId: "u1",
    },
    {
      id: "l2",
      title: "Handmade Bracelet",
      price: 20.0,
      imageUrl: "/images/mock/bracelet.jpg",
      category: "jewelery",
      userId: "u2",
    },
  ],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addListing: (state, action: PayloadAction<Listing>) => {
      state.items.push(action.payload);
    },
    editListing: (state, action: PayloadAction<Listing>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteListing: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addListing, editListing, deleteListing } = listingsSlice.actions;
export default listingsSlice.reducer;

export const selectUserListings = (userId: string) => (state: { listings: ListingsState }) =>
  state.listings.items.filter(item => item.userId === userId);
