import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const headers = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': '933713a9f7msh659131c02028bdcp175fc2jsn8165797cff2e',
};

const createRequest = (url) => ({ url, headers });

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bing-news-search1.p.rapidapi.com',
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, count }) =>
        createRequest(
          `/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
