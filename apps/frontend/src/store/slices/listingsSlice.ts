import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  userId: string;
  createdAt: string;
};

type ListingsState = {
  items: Listing[];
};

const initialState: ListingsState = {
  items: [
    {
      id: "l1",
      title: "Bluetooth Speaker",
      description: "Portable wireless speaker with deep bass.",
      price: 45.0,
      imageUrl: "/images/mock/bluetooth.png",
      category: "electronics",
      userId: "u1",
      createdAt: "2024-05-01T12:00:00Z",
    },
    {
      id: "l2",
      title: "Handmade Bracelet",
      description: "Elegant and minimal handcrafted bracelet.",
      price: 20.0,
      imageUrl: "/images/mock/bracelet.png",
      category: "jewelery",
      userId: "u2",
      createdAt: "2024-05-03T14:30:00Z",
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
