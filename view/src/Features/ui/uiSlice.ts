import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    isDarkMode: boolean;
}

const initialState: UiState = {
    isDarkMode: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = action.payload;
        },
    },
});

export const uiReducer = uiSlice.reducer;
export const selectIsDarkMode = (state: {ui: UiState}) => state.ui.isDarkMode;

export const { setDarkMode } = uiSlice.actions;