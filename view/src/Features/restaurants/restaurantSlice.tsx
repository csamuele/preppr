import { createSlice } from "@reduxjs/toolkit";
interface RestaurantState {
    currentRestaurant: {
        restaurantId: string;
        name: string;
    };
    }
const initialState = {
  currentRestaurant: {
    restaurantId: '',
    name: '',
  },
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setCurrentRestaurant(state, action) {
      state.currentRestaurant = action.payload;
    },
  },
});

export const { setCurrentRestaurant } = restaurantSlice.actions;
export const selectCurrentRestaurant = (state: RestaurantState) => state.currentRestaurant;
export const restaurantReducer = restaurantSlice.reducer;