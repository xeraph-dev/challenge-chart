import { ApiRepository, apiRepository } from './Sales'

interface Repositories {
  api: ApiRepository
}

export const repos: Repositories = {
  api: apiRepository,
}
