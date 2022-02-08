export interface Env {
  API_URL: string
}

export const { API_URL }: Env = require('../../../config/env')
