// api
import { api } from '@md-store/middlewares/api'
// types
import { User } from '@md-shared/types/entities'

export interface GetUserParams {
  id: string
}

export interface GetUsersParams {
  page?: number
}

export interface GetUserResponse {
  data: User
}

export interface GetUsersResponse {
  page: number
  // eslint-disable-next-line camelcase
  per_page: number
  // eslint-disable-next-line camelcase
  total_pages: number
  total: number
  data: User[]
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, GetUserParams>({
      query: (payload) => `/users/${payload.id}`,
      transformResponse: (response: GetUserResponse) => response.data,
    }),
    getUsers: build.query<GetUsersResponse, GetUsersParams>({
      query: (payload) => {
        return {
          params: payload,
          method: 'GET',
          url: `/users`,
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useLazyGetUserQuery, useLazyGetUsersQuery } = usersApi
