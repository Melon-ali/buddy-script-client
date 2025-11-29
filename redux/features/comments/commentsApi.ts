import baseApi from "../api/baseApi";

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // CREATE COMMENT
    userComments: build.mutation({
      query: (data: any) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    // GET ALL COMMENTS
    allComments: build.query({
      query: () => ({
        url: `/comments`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // GET COMMENTS BY POST ID
    getCommentsByPostId: build.query({
      query: (postId: string) => ({
        url: `/comments/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // DELETE COMMENT
    deleteComment: build.mutation({
      query: (commentId: string) => ({
        url: `/comments/${commentId}`,  
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }), 
  }),
});

export const {
  useUserCommentsMutation,
  useAllCommentsQuery,
  useGetCommentsByPostIdQuery,
  useDeleteCommentMutation,
} = commentsApi;
