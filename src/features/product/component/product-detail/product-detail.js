import DOMPurify from "dompurify";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCart } from "../../../../shared/store/slices/cart-slice";
import { withRouter } from "../../../../shared/utility/url-param";
import { getProduct } from "../../store/product-query";
import "./product-detail.css";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.setAttribute = this.setAttribute.bind(this);
    this.state = {
      currentImg: null,
      productSpecification: {
        selectedAttributes: [],
      },
    };
  }
  setAttribute(data) {
    this.setState({
      productSpecification: {
        ...this.state.productSpecification,
        selectedAttributes:
          this.state.productSpecification.selectedAttributes.some(
            (value) => value.name === data.name
          )
            ? this.state.productSpecification.selectedAttributes.map(
                (attribute) => {
                  if (attribute.name === data.name)
                    return { name: data.name, value: data.value };
                  return attribute;
                }
              )
            : [
                ...this.state.productSpecification.selectedAttributes,
                {
                  name: data.name,
                  value: data.value,
                },
              ],
      },
    });
  }
  componentDidMount() {
    const { getProduct,params } = this.props;
    getProduct(params.id).then((response) => {
      this.setState({
        currentImg: response.data?.product.gallery[0],
        productSpecification: {
          ...response.data.product,
          selectedAttributes: [
            ...response.data?.product?.attributes.map((attribute) => {
              return { name: attribute.name, value: attribute.items[0].value };
            }),
          ],
          quantity: 1,
        },
      });
    });
  }
  render() {
    const { product, loading, currency, setCartItem } = this.props;
    return (
      <div className="product-detail">
        <div className="img-list">
          {product?.data?.product?.gallery?.map((image, idx) => (
            <div className="img-box" key={idx} onClick={() => this.setState({ currentImg: image })}>
              {!product?.data?.product?.inStock && <div className="overlay flex justify-center items-center">
            OUT OF STOCK
          </div>}
              <img src={image} width={100} height={100} alt="img" />
            </div>
          ))}
        </div>
        <div
          style={{ 
            backgroundImage: `url(${this.state.currentImg})`,
          }}
          className="img-preview"
        > {!product?.data?.product?.inStock && <div className="overlay flex justify-center items-center">
        OUT OF STOCK
      </div>}</div>
        <div className="product-detail-description">
          <div className="product-description-name">
            <div className="brand"> {product?.data?.product?.brand}</div>
            <div> {product?.data?.product?.name}</div>
          </div>

          {product?.data?.product.attributes.map((attribute, index) => {
            return (
              <div className="w-full" key={index}>
                <div className="product-detail-attribute">
                  <div className="w-full">
                    <div className="product-detail-attribute-name">
                      {attribute.name}
                    </div>
                  </div>
                  <div className="product-detail-attribute-value flex items-center ">
                    {attribute.items.map((attributeItem, idx) =>
                      attribute.type === "swatch" ? (
                        <div
                          key={idx}
                          className="swatch-attribute"
                          style={{
                            border:
                              this.state.productSpecification.selectedAttributes.some(
                                (attr) =>
                                  attr.name === attribute.name &&
                                  attr.value === attributeItem.value
                              ) && "solid 1px #5ECE7B",
                            padding:
                              this.state.productSpecification.selectedAttributes.some(
                                (attr) =>
                                  attr.name === attribute.name &&
                                  attr.value === attributeItem.value
                              ) && "2px",
                          }}
                        >
                          <div
                            key={idx}
                            style={{
                              backgroundColor: attributeItem.value,
                            }}
                            onClick={() =>
                              this.setAttribute({
                                name: attribute.name,
                                value: attributeItem.value,
                              })
                            }
                          ></div>
                        </div>
                      ) : (
                        <div
                          key={idx}
                          className="text-attribute flex items-center justify-center"
                          style={{
                            backgroundColor:
                              this.state.productSpecification.selectedAttributes.some(
                                (attr) =>
                                  attr.name === attribute.name &&
                                  attr.value === attributeItem.value
                              )
                                ? "black"
                                : "",
                            color:
                              this.state.productSpecification.selectedAttributes.some(
                                (attr) =>
                                  attr.name === attribute.name &&
                                  attr.value === attributeItem.value
                              )
                                ? "white"
                                : "#1D1F22",
                          }}
                          onClick={() =>
                            this.setAttribute({
                              name: attribute.name,
                              value: attributeItem.value,
                            })
                          }
                        >
                          {attributeItem.value}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="product-price-container">
            <div className="title">PRICE:</div>
            <div className="value">
              {product?.data?.product?.prices.map((price) => {
                if (price.currency.symbol === currency.symbol)
                  return `${price.currency.symbol} ${price.amount.toFixed(2)}`;
                return null;
              })}
            </div>
          </div>
          <button
            className="cart-button"
            disabled={!product?.data?.product?.inStock}
            onClick={() => setCartItem(this.state.productSpecification)}
          >
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-loading"
                width="20px"
                height="20px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="10"
                  r="35"
                  stroke-dasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  />
                </circle>
              </svg>
            )}
            {!product?.data?.product?.inStock && <div className="overlay flex justify-center items-center">
       
      </div>}
            ADD TO CART
          </button>
          <div
            dangerouslySetInnerHTML={{
              __html:DOMPurify.sanitize(product?.data?.product?.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}
const mapDispatch = {
  getProduct: getProduct.initiate,
  setCartItem: setCart,
};
const mapStateToProps = (state, props) => ({
  product: getProduct.select(props.params.id)(state),
  loading: state.cartSlice.loading,
  currency: state.currencySlice.currency,
});
export default withRouter(connect(mapStateToProps, mapDispatch)(ProductDetail));
