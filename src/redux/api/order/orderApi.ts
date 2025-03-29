import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({data,token}) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: token,
                }
            }),
            invalidatesTags: ['Order','Product']
        }),
        verifyOrder: builder.query({
            query: (order_id) => ({
                url: "/orders/verify",
                params: { order_id },
                method: "GET",
            }),
            providesTags: ['Order'],
        }),
        getAllOrders: builder.query({
            query: () => '/orders',
            providesTags: ['Order'],
        }),
        getSingleUserOrders: builder.query({
            query: ({ user_id }) => `/orders/user-orders/${user_id}`,
            providesTags: ['Order'],
        }),
        calculateRevenue: builder.query({
            query: () => '/orders/revenue',
            providesTags: ['Revenue'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/update-order-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/delete-order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useVerifyOrderQuery,
    useGetAllOrdersQuery,
    useGetSingleUserOrdersQuery,
    useCalculateRevenueQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation
} = orderApi;
