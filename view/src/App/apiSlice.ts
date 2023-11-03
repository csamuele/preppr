import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { UserFormData, Credentials, UserResponse, RestaurantFormData, RestaurantResponse, Restaurant } from './types';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        //make every request include credentials

}),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userFormData: UserFormData) => ({
                url: '/register',
                method: 'POST',
                body: userFormData,
            }),
        }),

        login: builder.mutation({
            query: (credentials: Credentials) => ({
                url: '/login',
                method: 'POST',
                credentials: 'include',
                body: credentials,
            }),
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: `/me`,
                credentials: 'include',
            }),
            transformResponse: (response: {user: UserResponse}) => {
                return {
                    userId: response.user.user_id,
                    email: response.user.email,
                    firstName: response.user.first_name,
                    lastName: response.user.last_name,
                    lastLogin: response.user.last_login,
                };
            }
            
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        getRestaurants: builder.query({
            query: () => ({
                url: '/restaurants',
                credentials: 'include',
            }),
            transformResponse: (response: RestaurantResponse[]) => {
                return response.map((restaurant) => ({
                    restaurantId: restaurant.restaurant_id,
                    name: restaurant.name,
                    description: restaurant.description,
                    userId: restaurant.user_id,
                }));
            },
        }),
        createRestaurant: builder.mutation({
            query: (restaurantFormData: RestaurantFormData) => ({
                url: '/restaurants',
                method: 'POST',
                body: restaurantFormData,
            }),

        }),
    }),
    
});

export const {useGetCurrentUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation, useCreateRestaurantMutation, useGetRestaurantsQuery} = apiSlice;