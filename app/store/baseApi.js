import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BaseApi = createApi({
    reducerPath: 'general_service',
    baseQuery:  fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,
        prepareHeaders: async (headers) => {
            headers.set('Accept', `application/json`)
            const token = await AsyncStorage.getItem("token");
            const user = await AsyncStorage.getItem("user");
            if (token && user){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        },
        credentials: 'include',
    }),
    endpoints: () => ({}),
    tagTypes: [
        'logout',
        'user'
    ]
})