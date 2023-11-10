import { apiSlice } from "App/apiSlice";
import {
    Station,
    StationResponse,
    StationFormData,
} from "Features/stations";


export const stationApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStations: builder.query({
            query: (restaurantId: string) => `restaurants/${restaurantId}/stations`,
            transformResponse: (response: StationResponse[]) => {
                return response.map((station) => ({
                    stationId: station.station_id,
                    name: station.name,
                    restaurantId: station.restaurant_id,
                }));
            },
            providesTags: ['Station'],
        }),
        createStation: builder.mutation({
            query: (stationFormData: StationFormData) => ({
                url: `/stations`,
                method: 'POST',
                body: stationFormData,
            }),
            invalidatesTags: ['Station'],
        }),
        updateStation: builder.mutation({
            query: ({ name, stationId }: { name: string, stationId: string }) => ({
                url: `/stations/${stationId}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: ['Station'],
        }),
        deleteStation: builder.mutation({
            query: (stationId: string) => ({
                url: `/stations/${stationId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Station'],
        }),

    })
})

export const {
    useGetStationsQuery,
    useCreateStationMutation,
    useUpdateStationMutation,
    useDeleteStationMutation,
} = stationApi;

