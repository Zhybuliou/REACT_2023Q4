import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import url from '../data/url';

const apiResult = createApi({
  reducerPath: 'apiResult',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/people/`,
  }),
  endpoints: (build) => ({
    getApiResult: build.query({
      query: (arg) => `?search=${arg.search}&page=${arg.page}`,
    }),
  }),
});

export default apiResult;

export const { useGetApiResultQuery } = apiResult;
