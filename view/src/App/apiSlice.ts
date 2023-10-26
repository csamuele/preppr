import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export interface Credentials {
    email: string;
    password: string;
}
export interface UserFormData {
    email: string;
    password: string;
    confirm: string;
    firstName: string;
    lastName: string;
}
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
            
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
    
});

export const {useGetCurrentUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation} = apiSlice;