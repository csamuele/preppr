//Dashboard page that says welcome in big letters in the middle of the screen

import {useState} from 'react';
import { Container, Grid, Button, CircularProgress } from '@mui/material';
import { useGetRestaurantsQuery } from 'App/apiSlice';
import { RestaurantCard, RestaurantNewEdit } from 'Features/restaurants';
import { Restaurant } from 'App/types';
export const Restaurants = () => {
    const {
        data: restaurants,
        isLoading: isLoadingRestaurants,
        error: errorRestaurants,
    } = useGetRestaurantsQuery({});
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const handleNewRestaurant = () => {

        const newRestaurant: Restaurant = {
            restaurantId: '',
            name: '',
            description: '',
            userId: '',
        };
        setRestaurant(newRestaurant);
    }
    const handleEditRestaurant = (restaurant: Restaurant) => {
        setRestaurant(restaurant);
    }
    const handleClose = () => {
        setRestaurant(null);
    }

    if ( isLoadingRestaurants) {
        return <CircularProgress />;
    }
    return (
        <Container>
            <Grid container spacing={3}>
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.restaurantId}
                        name={restaurant.name}
                        description={restaurant.description}
                        onEdit={() => handleEditRestaurant(restaurant)}
                    />
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleNewRestaurant}>
                        Add Restaurant
                    </Button>
                </Grid>
            </Grid>
            <RestaurantNewEdit
                onClose={handleClose}
                restaurant={restaurant}
            />
        </Container>
    );
}