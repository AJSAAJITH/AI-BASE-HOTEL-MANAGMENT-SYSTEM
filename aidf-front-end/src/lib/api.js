import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:5000"; // Removed the trailing slash

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }), // Keep the leading slash here
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "hotels", // This will correctly resolve to http://localhost:5000/api/hotels
    }),
    getHotelById: builder.query({
      query:(id) => `hotels/${id}`,
    }),
    createHotel: builder.mutation({
      query:(hotel)=>({
        url:"hotels",
        method:"POST",
        body:hotel
      })
    })
  }),
});

export const { useGetHotelsQuery, useGetHotelByIdQuery, useCreateHotelMutation } = api;