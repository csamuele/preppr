import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { UserFormData, Credentials, UserResponse, RestaurantFormData, RestaurantResponse, Restaurant, UpdateUserFormData } from './types';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        //make every request include credentials
    credentials: 'include',
}),

    tagTypes: ['User', 'Restaurant'],
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
            },
            providesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        updateUser: builder.mutation({
            query: (updateUserFormData: UpdateUserFormData) => ({
                url: '/me',
                method: 'PUT',
                body: updateUserFormData,
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
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
            providesTags: ['Restaurant'],
        }),
        createRestaurant: builder.mutation({
            query: (restaurantFormData: RestaurantFormData) => ({
                url: '/restaurants',
                method: 'POST',
                body: restaurantFormData,
            }),
            invalidatesTags: ['Restaurant'],

        }),
        updateRestaurant: builder.mutation({
            query: ({restaurantId, ...restaurantFormData}: {restaurantId: string} & RestaurantFormData) => ({
                url: `/restaurants/${restaurantId}`,
                method: 'PUT',
                body: restaurantFormData,
            }),
            invalidatesTags:['Restaurant'],
        }),
    }),
    
});

export const {
    useGetCurrentUserQuery, 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useUpdateUserMutation ,
    useCreateRestaurantMutation, 
    useGetRestaurantsQuery,
    useUpdateRestaurantMutation,
} = apiSlice;