import { gql } from "graphql-request";
import { appApi } from "../../../store/app-api";
export const productQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => ({
        body: gql`
          query getProduct($id: String!) {
            product(id: $id) {
              id
              name
              brand
              inStock
              gallery
              description
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              attributes {
                name
                type
                items {
                  displayValue
                  value
                }
              }
            }
          }
        `,
        variables: { id: id },
      }),
    }),
    getCategory: builder.query({
      query: (input) => ({
        body: gql`
          query getCategory($input: CategoryInput!) {
            category(input: $input) {
              name
              products {
                id
                name
                brand
                inStock
                gallery
                description
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                attributes {
                  name
                  type
                  items {
                    displayValue
                    value
                  }
                }
              }
            }
          }
        `,
        variables:{input:{title:input }},
      }),
    }),
    getCurrency: builder.query({
      query: () => ({
        body: gql`
          query getCurrency {
            currencies {
              label
              symbol
            }
          }
        `,
      }),
    }),
    getCategories: builder.query({
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
  }),
});
export const { getCategories, getCurrency, getProduct, getCategory } =
  productQuery.endpoints;
