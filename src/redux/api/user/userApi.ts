import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: (params) => ({
                url: "/users/me",
                method: "GET",
                headers: {
                    Authorization: params,
                },
            }),
            providesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: () => "/users",
            providesTags: ['User'],
        }),
    }),
});

export const { useGetMeQuery, useGetAllUsersQuery } = userApi;
