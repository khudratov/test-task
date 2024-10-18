import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { rtkQueryErrorNotify } from '../helpers/redux-middlewares/notify-on-error.tsx';

const baseUrl = 'http://api.calmplete.net/api/';
const JWT =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZab0VjXzhpcmc5a0lyZzk4NnUzSnN5UzVlbHdKOFRzaGt2VDFOZElVd3MifQ.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJlZWMxNTI4Mi0wYzMyLTQyN2UtZmEzOC0wOGRjZWVjOGUyZWQiLCJuYmYiOjE3MjkxODI3MTcsImV4cCI6MTcyOTI2OTExNywiaWF0IjoxNzI5MTgyNzE3LCJpc3MiOiJDYWxtcGxldGUgQXV0aG9yaXphdGlvbiBTZXJ2ZXIiLCJhdWQiOiJDYWxtcGxldGUifQ.aoz0lfl4JwdNtYNR5Jp4E0cM-cw5fHYZl1jz2f4dkXT71J98hKz0Os61Rzkbmccggsn8qvUGF1MlvE4IKc1kSRm6K68bxLB3Js39FNJKBQx2Q3OAJOlKej5Nx5Tr80A-4lbW8nE0aeubPllX6Tk54GK_BQihIU0RltbLtnPkATWIU_4um1xzkv_OQaNt3vBpj3Qt7z8jQJBJYbIHDhKffYF7g-Lg-g5agOuBCeE_kq4zyr6fQeQ2s3u-gaqInQWAl9WwtIVIL3MXEpChHaflmYuXkdi6n_UFi_TmgTGpwG5cVVECpZJZZjTrHbPJ8gox2127USiGuDVZ85HV4gmpfA';

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Todos'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: headers => {
			headers.set('Authorization', `Bearer ${JWT}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: () => ({}),
});

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware, rtkQueryErrorNotify),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
