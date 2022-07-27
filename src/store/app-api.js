import { createApi } from '@reduxjs/toolkit/query/react'
import graphqlBaseQuery from '../shared/utility/graphql-basequery'
// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: graphqlBaseQuery('http://localhost:4000/'),
  endpoints: () => ({}),
})
