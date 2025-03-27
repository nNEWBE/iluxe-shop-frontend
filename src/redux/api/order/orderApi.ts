import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Order','Product']
        }),
        getAllOrders: builder.query({
            query: () => '/orders',
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
    useGetAllOrdersQuery,
    useCalculateRevenueQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation
} = orderApi;
