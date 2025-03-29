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
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/update-user/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: () => "/users",
            providesTags: ['User'],
        }),
        blockUser: builder.mutation({
            query: ({ id, isBlocked }) => ({
                url: `/users/change-status/${id}`,
                method: "PATCH",
                body: { isBlocked },
            }),
            invalidatesTags: ['User'],
        })
    }),
});

export const { useGetMeQuery,useUpdateUserMutation, useGetAllUsersQuery,useBlockUserMutation } = userApi;
