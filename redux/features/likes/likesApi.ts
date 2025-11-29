import baseApi from "../api/baseApi";

const likesApi = baseApi.injectEndpoints({
  overrideExisting: true, // ✅ add this
  endpoints: (build) => ({
    userLikes: build.mutation({
      query: (data: any) => ({
        url: "/likes",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["likes"],
    }),

    allLikes: build.query({
      query: () => ({
        url: `/likes`,
        method: "GET",
      }),
      providesTags: ["likes"],
    }),
  }),
});

export const { useUserLikesMutation, useAllLikesQuery } = likesApi;
