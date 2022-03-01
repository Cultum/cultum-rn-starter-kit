// libs
import { createApi, retry, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// env
import { API_URL } from '@md-shared/services/env'
// utils
import { storageManager } from '@md-shared/utils/storage'

const staggeredBaseQuery = retry(fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers) => {
    const token = await storageManager.getAuthToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
}), {
  maxRetries: 3,
})

export const api = createApi({
  baseQuery: staggeredBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
})
