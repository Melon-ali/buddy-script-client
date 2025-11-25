// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: "https://buddy-script-backend-ebon.vercel.app/api/v1", // Replace with your API's base URL
        prepareHeaders: (headers) => {
            // const token = Cookies.get("token") 
            const token = localStorage.getItem("token");
            // Assuming token is stored in the auth slice
            console.log('admin token',token);

            if (token) {
                headers.set('Authorization', `${token}`);
                
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["approveEvent", "allPosts", "register", "logIn", "transaction", "allUsers", "allCreators", "complains", "updateSubscription", "posts", "comments" , "allComments" , "likes"],
});

// Export hooks for usage in functional components
export default baseApi;
