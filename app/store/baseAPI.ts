import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseAPI = createApi({
  reducerPath: 'base_api_service',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_,
    prepareHeaders: (headers: Headers) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
});
