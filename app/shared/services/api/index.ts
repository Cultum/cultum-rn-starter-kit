// libs
import axiosRetry from 'axios-retry'
import axios, { AxiosError } from 'axios'
// constants
import { API_URL } from '../env'
// utils
import { getRequestError } from './helpers'
// controllers
import { getAuthControllers, getUserControllers } from './controllers'

export type CustomHeaders = { [key: string]: string }
export type APIVariables = {
  token?: string | null
  baseURL?: string
  retries?: number
  customHeaders?: CustomHeaders
}
const NUMBER_OF_RETRIES = 3
const DELAY_MULTIPLIER = 2000

const customRetryCondition = (error: AxiosError<any>) =>
  axiosRetry.isNetworkOrIdempotentRequestError(error) || getRequestError(error)._tag === 'NoResponseError'

const customRetryDelay = (retryCount: number) => retryCount * DELAY_MULTIPLIER

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAPI = ({ baseURL = API_URL, customHeaders = {}, token, retries }: APIVariables = {}) => {
  /* ------------- API instance ------------- */

  const api = axios.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      ...customHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 60000,
  })

  axiosRetry(api, {
    retries: retries == null ? NUMBER_OF_RETRIES : retries,
    retryDelay: customRetryDelay,
    retryCondition: customRetryCondition,
  })

  /* ------------- Controllers ------------- */

  const getRoot = () => api.get<{ result: string[] }>('/')

  return {
    getRoot,
    // AUTH
    ...getAuthControllers(api),
    // USER
    ...getUserControllers(api),
  }
}

export type CreateApi = (config?: APIVariables) => ReturnType<typeof createAPI>

export * from './helpers'
