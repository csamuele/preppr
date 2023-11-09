import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "App/store";
interface RestaurantState {
    currentRestaurant: {
        restaurantId: string;
    };
    }
const storedRestaurantId = localStorage.getItem('currentRestaurantId');
const initialState = {
  currentRestaurant: {
    restaurantId: storedRestaurantId || '',
  },
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setCurrentRestaurant(state, action: PayloadAction<{ restaurantId: string  }>) {
      state.currentRestaurant = action.payload;
    },
  },
});

export const { setCurrentRestaurant } = restaurantSlice.actions;
export const selectCurrentRestaurant = (state: RootState) => state.restaurant.currentRestaurant;
export const restaurantReducer = restaurantSlice.reducer;