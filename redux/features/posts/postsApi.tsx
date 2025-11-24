import baseApi from "../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPosts: build.mutation({
      query: (data: any) => {
        return {
          url: "/posts",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    allPosts: build.query({
      query: () => ({
        url: `/posts`,
        method: "GET",
      }),
      providesTags: ["allPosts"],
    }),
    getPostById: build.query({
      query: (postId: string) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["allPosts"],
    }),
    detelePost: build.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: build.mutation({
      query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
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
  useDetelePostMutation,
  useUpdatePostMutation,
} = postApi;
