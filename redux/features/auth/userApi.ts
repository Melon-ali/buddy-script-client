import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["logIn"],
    }),

    userRegister: build.mutation({
      query: (data: any) => {
        return {
          url: "/users/register",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["register"],
    }),

    userById: build.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserById"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    allUsers: build.query({
      query: ({ page, limit, email }) => ({
        url: `/user/normal-user-all?page=${page}&limit=${limit}&email=${email}`,
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),

    userStatusUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/user/toggle-user_status/${data?.id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["allCreators", "allUsers"],
    }),

    sendOtp: build.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    verifyOtp: build.mutation({
      query: (data: { email: string; otp: number }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data: { password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useUserRegisterMutation,
  useUserByIdQuery,
  useLogoutUserMutation,
  useAllUsersQuery,
  useUserStatusUpdateMutation,
  useGetMeQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = userApi;
