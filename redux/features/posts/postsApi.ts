import baseApi from "../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPosts: build.mutation({
      query: (data: any) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    allPosts: build.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),

    getPostById: build.query({
      query: (postId: string) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),

    // ✅ Corrected delete mutation
    deletePost: build.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    updatePost: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostsMutation,
  useDeletePostMutation, // ✅ corrected hook
  useUpdatePostMutation,
} = postApi;
