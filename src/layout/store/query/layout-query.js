import { gql } from 'graphql-request';
import { appApi } from "../../../store/app-api";
export const layoutQuery = appApi.injectEndpoints({
    endpoints: (builder) => ({
      getNavCategories: builder.query({
        query: () => ({
          body: gql`
          query {
            categories{
              name
            }
            }
          `,
        }),
      }),
      getCurrency: builder.query({
        query: () => ({
          body: gql`
          query getCurrency{
            currencies{
              label
              symbol
            }
          }
          `,
        }),
      }),
    }),
  });
export const {getNavCategories,getCurrency} = layoutQuery.endpoints