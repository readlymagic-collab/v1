import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAdminToken } from "@/lib/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = getAdminToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AdminSessions", "Students", "Passages", "Words"],
  endpoints: (builder) => ({
    // We will inject endpoints here as we build them
    getAdminSessions: builder.query<any, void>({
      query: () => "/admin/sessions",
      providesTags: ["AdminSessions"],
    }),
    getWords: builder.query<any, void>({
      query: () => "/words",
      providesTags: ["Words"],
    }),
    createWord: builder.mutation<any, any>({
      query: (body) => ({
        url: "/words",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Words"],
    }),
    updateWord: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/words/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Words"],
    }),
    deleteWord: builder.mutation<any, string>({
      query: (id) => ({
        url: `/words/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Words"],
    }),
    bulkUploadWords: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/words/bulk",
        method: "POST",
        body: formData,
        // FormData is automatically handled by fetchBaseQuery if body is FormData
      }),
      invalidatesTags: ["Words"],
    }),
  }),
});

export const { 
  useGetAdminSessionsQuery, 
  useGetWordsQuery, 
  useCreateWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useBulkUploadWordsMutation,
} = apiSlice;
