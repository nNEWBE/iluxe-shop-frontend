import { baseApi } from './../baseApi';

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: ({ data, token }: { data: object; token: string | null }) => ({
                url: '/products/create',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `${token}`,
                },
            }),
            invalidatesTags: ['Product'],
        }),
        getAllProducts: builder.query({
            query: (params) => ({
                url: '/products',
                params,
            }),
            providesTags: ['Product'],
        }),
        getAllProductsWithoutQuery: builder.query({
            query: () => ({
                url: '/products/all',
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        })
    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetAllProductsWithoutQueryQuery,
    useGetProductByIdQuery,
    useDeleteProductMutation
} = productApi;