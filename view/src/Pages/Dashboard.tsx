//Dashboard page that says welcome in big letters in the middle of the screen

import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { useGetCurrentUserQuery, useCreateRestaurantMutation, useGetRestaurantsQuery } from 'App/apiSlice';
import { RestaurantCard } from 'Features/restaurants';
export const Dashboard = () => {
    const {
        data: user,
        isLoading,
        error,
    } = useGetCurrentUserQuery({});
    const {
        data: restaurants,
        isLoading: isLoadingRestaurants,
        error: errorRestaurants,
    } = useGetRestaurantsQuery({});
    return (
        <Container>
            <Grid container spacing={3}>
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.restaurantId}
                        name={restaurant.name}
                        description={restaurant.description}
                    />
                ))}
            </Grid>
        </Container>
    );
};