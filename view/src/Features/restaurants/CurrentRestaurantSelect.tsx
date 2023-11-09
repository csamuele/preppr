import { useSelector } from "react-redux";
import { Select } from "Features/ui";
import { selectCurrentRestaurant, setCurrentRestaurant } from "Features/restaurants";
import { useGetRestaurantsQuery } from "App/apiSlice";
import { SelectChangeEvent } from '@mui/material';
import { useDispatch } from "Utils/Hooks";

export const CurrentRestaurantSelect = () => {
    const dispatch = useDispatch();
    const {
        data: restaurants,
        isLoading: isLoadingRestaurants,
        error: errorRestaurants,
    } = useGetRestaurantsQuery({});
    const currentRestaurant = useSelector(selectCurrentRestaurant);
    if (currentRestaurant.restaurantId === '' && restaurants?.length && !isLoadingRestaurants) {
        dispatch(setCurrentRestaurant({ 
            restaurantId: restaurants[0].restaurantId}));
        localStorage.setItem('currentRestaurantId', restaurants[0].restaurantId);
    }
        
    const handleChange = (event: SelectChangeEvent<string>) => {
        dispatch(setCurrentRestaurant({ restaurantId: event.target.value}));
        localStorage.setItem('currentRestaurantId', event.target.value);
    };
    const options = restaurants?.map((restaurant) => ({
        value: restaurant.restaurantId,
        label: restaurant.name,
    })) || [];
    if (isLoadingRestaurants || !currentRestaurant) {
        return null;
    }
    return (
        
        
                <Select
                    options={options}
                    value={currentRestaurant.restaurantId}
                    onChange={handleChange}
                    variant="standard"
                    fontSize="1.5rem"
                />
          
        
    );
}
