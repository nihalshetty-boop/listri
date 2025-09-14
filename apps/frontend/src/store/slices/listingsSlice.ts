import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  condition?: string;
  location?: string;
  city?: string;
  state?: string;
  buyingMethod?: string;
  negotiable: boolean;
  isSold: boolean;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    avatarUrl?: string;
  };
};

type ListingsState = {
  items: Listing[];
};

const initialState: ListingsState = {
  items: [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<Listing[]>) => {
      state.items = action.payload;
    },
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

export const { setListings, addListing, editListing, deleteListing } = listingsSlice.actions;
export default listingsSlice.reducer;

export const selectUserListings = (userId: string) => (state: { listings: ListingsState }) =>
  state.listings.items.filter(item => item.userId === userId);
