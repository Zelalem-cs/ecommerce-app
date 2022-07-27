import { appApi } from "../../../store/app-api";
import { gql } from 'graphql-request'
export const productQuery = appApi.injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => ({
          body: gql`
          query {
            categories{
              name
              products{
                id
                name
                brand
                inStock
                gallery
                prices{
                  currency{
                    symbol
                  }
                  amount
                }
                attributes{
                  name
                  items{
                    displayValue
                    value
                  }
                }
              }
            }
            }
          `,
        }),
      }),
      getProduct: builder.query({
        query:(id) => ({
          body:gql`query getProduct($id:String!){
            product(id:$id){
              id
              name
              brand
              gallery
              description
              prices{
                currency{
                  label
                  symbol
                }
                amount
              }
              attributes{
                name
                type
                items{
                  displayValue
                  value
                }
              }
            }
          }`,
          variables:{id:id}
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
export const {getCategories,getCurrency,getProduct} = productQuery.endpoints