import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: (builder) => ({
    shortenUrl: builder.mutation({
      invalidatesTags: ['Url'],
      query: (original_url) => ({
        body: { original_url: original_url },
        method: 'POST',
        url: `/shorten`,
      }),
    }),
    getUrls: builder.query({
      providesTags: ['Url'],
      query: () => ({
        method: 'GET',
        url: `/urls`,
      }),
    }),
    getOriginalUrl: builder.query({
      providesTags: ['Url'],
      query: (original_url) => ({
        method: 'GET',
        url: `/fetch_original_url/${original_url}`,
      }),
    }),
    deleteUrl: builder.mutation({
      invalidatesTags: ['Url'],
      query: (token) => ({
        method: 'DELETE',
        url: `/${token}`,
      }),
    }),
  }),
  reducerPath: 'apiSlice',
  tagTypes: ['Url'],
});

export const {
  useShortenUrlMutation,
  useGetUrlsQuery,
  useGetOriginalUrlQuery,
  useDeleteUrlMutation,
} = apiSlice;
