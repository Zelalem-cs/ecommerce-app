import React, { Component } from "react";
import { connect } from "react-redux";
import { setCart } from "../../../../shared/store/slices/cart-slice";
import { withRouter } from "../../../../shared/utility/url-param";
import { getProduct } from "../../store/product-query";
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
    const { getProduct } = this.props;
    getProduct(this.props.params.id).then((response) => {
      document.getElementById("description").innerHTML =
        response.data?.product?.description;
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
    return (
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {this.props.product?.data?.product?.gallery?.map((image, idx) => (
            <div
              key={idx}
              style={{ padding: "2px", cursor: "pointer" }}
              onClick={() => this.setState({ currentImg: image })}
            >
              <img src={image} width={100} height={100} alt="img" />
            </div>
          ))}
        </div>
        <div
          style={{
            width: "700px",
            height: "450px",
            backgroundImage: `url(${this.state.currentImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          style={{
            width: "300px",
            fontFamily: "Raleway",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
            }}
          >
            <div  style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}>{this.props.product?.data?.product?.brand}</div>
            {this.props.product?.data?.product?.name}
            
          </div>
          {this.props.product?.data?.product.attributes.map(
            (attribute, index) => {
              return (
                <div style={{ width: "100%" }} key={index}>
                  <div
                    style={{
                      width: "100%",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          fontSize: "18px",
                          fontFamily: "Roboto Condensed",
                          fontWeight: "bold",
                        }}
                      >
                        {attribute.name}
                      </div>
                    </div>
                    <div
                      style={{ width: "100%", gap: "5px" }}
                      className="flex items-center "
                    >
                      {attribute.items.map((attributeItem, idx) =>
                        attribute.type === "swatch" ? (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              justifyContent: "center",
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
                                width: "30px",
                                height: "30px",
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
                            className="flex items-center justify-center"
                            style={{
                              border: "solid 1px",
                              width: "fit-content",
                              height: "fit-content",
                              padding: "14px",
                              fontFamily: "Source Sans Pro",
                              fontStyle: "normal",
                              fontSize: "12px",
                              fontWeight: "400",
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
            }
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontFamily: "Roboto Condensed",
                fontWeight: "bold",
              }}
            >
              PRICE:
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {this.props.product?.data?.product?.prices.map((price) => {
                if (
                  price.currency.symbol ===
                  this.props.currency.symbol
                )
                  return `${price.currency.symbol} ${price.amount}`;
                return null;
              })}
            </div>
          </div>
          <button
            style={{
              width: "100%",
              height: "43px",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "#5ECE7B",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() =>
              this.props.setCartItem(this.state.productSpecification)
            }
          >
            {this.props.loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", shapeRendering: " auto" }}
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
            ADD TO CART
          </button>
          <div id="description"></div>
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
  currency:state.currencySlice.currency
});
export default withRouter(connect(mapStateToProps, mapDispatch)(ProductDetail));
