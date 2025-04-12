import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskapiSlice = createApi({
    reducerPath: "taskapi",
    tagTypes:["Task"],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials:"include"
     }),
    endpoints: (builder) => ({
        // Mutation for creating a new post
        createTask: builder.mutation({
            query: (newTask) => ({
                url: "/task/createtask",
                method: "POST",
                body: newTask,
            }),
            invalidatesTags:["Task"]
        }),
        getTask: builder.query({
            query: ({id}) => ({
                url: `/task/gettask?id=${id}`,
            })
        }),
        getAllTask: builder.query({
            query:({page=1, limit=5})=>({
                url:`/task/getalltask?page=${page}&limit=${limit}`
            }),
            providesTags:["Task"]
        }),
        updateTask: builder.mutation({
            query: ({id, data}) => ({ 
                url: `/task/updatetask?id=${id}`,
                method:"POST",
                body:data 
            }),
            invalidatesTags:["Task"]
        }),
        changeStatus: builder.mutation({
            query:({id, completeStatus})=>({
                url:`/task/changeStatus?id=${id}`,
                method:"POST",
                body: { completeStatus : completeStatus}
            }),
            invalidatesTags:["Task"]
        }),
        deleteTask:builder.mutation({
            query:(id)=>({
                url:`/task/deletetask?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Task"]
        })
    }),
});
export const { useGetAllTaskQuery, 
               useDeleteTaskMutation, 
               useCreateTaskMutation,
               useChangeStatusMutation,
               useUpdateTaskMutation
             } = taskapiSlice;