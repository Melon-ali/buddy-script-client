// import baseApi from "../api/baseApi";

// const commentsApi = baseApi.injectEndpoints({
//   overrideExisting: true, // ✅ add this
//   endpoints: (build) => ({
//     userComments: build.mutation({
//       query: (data: any) => ({
//         url: "/comments",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["comments"],
//     }),

//     allComments: build.query({
//       query: () => ({
//         url: `/comments`,
//         method: "GET",
//       }),
//       providesTags: ["allComments"],
//     }),

//     getCommentsByPostId: build.query({
//       query: (postId: string) => ({
//         url: `/comments/post/${postId}`,
//         method: "GET",
//       }),
//       providesTags: ["allComments"],
//     }),
//   }),
// });

// export const {
//   useUserCommentsMutation,
//   useAllCommentsQuery,
//   useGetCommentsByPostIdQuery,
// } = commentsApi;

import baseApi from "../api/baseApi";

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userComments: build.mutation({
      query: (data: any) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),

    allComments: build.query({
      query: () => ({
        url: `/comments`,
        method: "GET",
      }),
      providesTags: ["allComments"],
    }),

    getCommentsByPostId: build.query({
      query: (postId: string) => ({
        url: `/comments/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["allComments"],
    }),
  }),
});

export const {
  useUserCommentsMutation,
  useAllCommentsQuery,
  useGetCommentsByPostIdQuery,
} = commentsApi;
