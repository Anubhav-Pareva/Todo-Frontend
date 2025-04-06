import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userapiSlice = createApi({
    reducerPath: "userapi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials:"include"
    }),
    endpoints: (builder) => ({
        // Mutation for creating a new post
        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/user/signup",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser:builder.mutation({
            query:(user)=>({
                url:"/user/login",
                method:"POST",
                body:user
            })
        }),
        logoutUser:builder.query({
            query:()=>({url:"/user/logout"})
        }),
        userAuth:builder.query({
            query:()=>({
                url:"/user/userauth"
            })
        })
    }),
});

export const { useCreateUserMutation, useLoginUserMutation, useLazyLogoutUserQuery, useUserAuthQuery} = userapiSlice;

