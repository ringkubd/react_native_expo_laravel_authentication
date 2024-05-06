import {BaseApi} from "../../baseApi";

const logoutAPIService = BaseApi.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: arg => ({
                url: 'token/logout',
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: ['logout']
        }),
        userAPI: builder.query({
            query: arg => ({
                url: 'user'
            }),
            providesTags: ['user']
        })
    })
})
export const {
    useLogoutMutation,
    useUserAPIQuery,
    util: { getRunningQueriesThunk },
} = logoutAPIService;

export const {
    logout
} = logoutAPIService.endpoints;