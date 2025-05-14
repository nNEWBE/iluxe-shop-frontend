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
            query: ({
                page,
                limit,
                query
            }: {
                page?: string | null;
                limit?: string | null;
                query?: { [key: string]: string | string[] | undefined | null };
            }) => {
                const params: Record<string, string> = {};

                if (query?.price) {
                    const transformedPrice = `0-${query.price}`;
                    params.price = String(transformedPrice);
                }
                if (query?.category) params.category = String(query.category);
                if (query?.brand) params.brand = String(query.brand);
                if (query?.search) params.search = String(query.search);
                if (page) params.page = page;
                if (limit) params.limit = limit;

                return {
                    url: '/products',
                    params,
                };
            },
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