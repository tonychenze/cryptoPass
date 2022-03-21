import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoRequestApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '933713a9f7msh659131c02028bdcp175fc2jsn8165797cff2e',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoRequestApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptosApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
