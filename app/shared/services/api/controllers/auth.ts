import { AxiosInstance } from 'axios'

export interface AuthVariables {
  email: string
  password: string
}

export interface SignUpResponse {
  id: string
  token: string
}

export interface LogInResponse {
  id?: string
  token: string
}

export const getAuthControllers = (api: AxiosInstance) => ({
  signUp: (variables: AuthVariables) => api.post<SignUpResponse>('/register', variables),
  logIn: (variables: AuthVariables) => api.post<LogInResponse>('/login', variables),
})
