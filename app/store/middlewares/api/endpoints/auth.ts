import { api } from '@md-store/middlewares/api'

export interface AuthVariables {
  email: string
  password: string
}

export interface SignUpResponse {
  data: {
    id: string
    token: string
  }
}

export interface LogInResponse {
  data: {
    token: string
  }
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, AuthVariables>({
      query: (payload) => ({
        body: payload,
        method: 'POST',
        url: '/register',
      }),
    }),
    logIn: build.mutation<LogInResponse, AuthVariables>({
      query: (payload) => ({
        body: payload,
        method: 'POST',
        url: '/login',
      }),
    }),
  }),
  overrideExisting: true
})

export const { useSignUpMutation, useLogInMutation } = authApi
