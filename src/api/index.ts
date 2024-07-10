import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	reducerPath: 'exampleApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
	endpoints: () => ({}),
});
