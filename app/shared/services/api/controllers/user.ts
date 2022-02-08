import { AxiosInstance } from 'axios'
import { User } from '@md-shared/types/entities'

export interface GetUserParams {
  id: string
}

export interface GetUserResponse {
  data: User
}

export interface GetUsersParams {
  page?: number
}

export interface GetUsersResponse {
  page: number
  // eslint-disable-next-line camelcase
  per_page: number
  total: number
  // eslint-disable-next-line camelcase
  total_pages: number
  data: User[]
}

export const getUserControllers = (api: AxiosInstance) => ({
  getUser: (params: GetUserParams) => api.get<GetUserResponse>(`/users/${params.id}`),
  getUsers: (params: GetUsersParams) =>
    api.get<GetUsersResponse>('/users', {
      params: { page: 0, ...params },
    }),
})
