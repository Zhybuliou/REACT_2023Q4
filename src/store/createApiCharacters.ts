import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import url from '../data/url';

const apiResultCharacters = createApi({
  reducerPath: 'apiResultCharacters',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/people/`,
  }),
  endpoints: (build) => ({
    getApiResult: build.query({
      query: (arg) => `${arg.id}`,
    }),
  }),
});

export default apiResultCharacters;

export const { useGetApiResultQuery } = apiResultCharacters;
