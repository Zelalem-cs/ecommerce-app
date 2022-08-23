import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  removeProductFromCart,
  reset,
  setCart
} from "../../../../shared/store/slices/cart-slice";
import "./cart-detail.css";

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewImage: [], purchase: false };
    this.order = this.order.bind(this);
  }
  componentDidMount() {
    const viewImage = this.props.cartItem.map((item, idx) => {
      return { index: idx, imageIndex: 0 };
    });
    this.setState({ viewImage: viewImage });
  }
  order(data) {
    localStorage.removeItem("cartItem");
    localStorage.removeItem("total");
    localStorage.removeItem("totalQuantity");
    this.props.resetCartState();
    this.setState({ purchase: true });
  }
  purchase = (
    <div className="success-container">
      <div className="success-message">
        <div className="success-close-icon">
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </NavLink>
        </div>
        <div className="success-text-message">
          <div className="success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-check"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
          </div>
          <div className="success-text">Thank You !</div>
        </div>
      </div>
    </div>
  );
  render() {
    const {
      cartItem,
      totalQuantity,
      totalFee,
      currency,
      setCartItem,
      removeCartItem,
    } = this.props;
    return this.state.purchase ? (
      this.purchase
    ) : (
      <div className="cart-container">
        <div className="cart-title">Cart</div>
        {cartItem.map((item, idx) => {
          return (
            <div className="cart-item flex justify-between" key={idx}>
              <div className="cart-item-description">
                <div className="flex item-name">
                  <div className="brand">{`${item.brand}`}</div>
                  <div className="name">{`${item.name}`}</div>
                </div>
                <div className="item-price">
                  <div>
                    {item.prices.map(
                      (price) =>
                        price.currency.symbol === currency.symbol &&
                        `${price.currency.symbol}${price.amount}`
                    )}
                  </div>
                </div>

                <div className="items-container">
                  {item.attributes.map((attribute, index) => {
                    return (
                      <div className="item-container" key={index}>
                        <div className="item-attribute-name">
                          <p>{attribute.name}:</p>
                        </div>
                        <div className="item-attribute-value-container flex items-center ">
                          {attribute.items.map((attributeItem, idx) =>
                            attribute.type === "swatch" ? (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  border:
                                    item.selectedAttributes.some(
                                      (attr) =>
                                        attr.name === attribute.name &&
                                        attr.value === attributeItem.value
                                    ) && "solid 1px #5ECE7B",
                                  padding:
                                    item.selectedAttributes.some(
                                      (attr) =>
                                        attr.name === attribute.name &&
                                        attr.value === attributeItem.value
                                    ) && "2px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    backgroundColor: attributeItem.value,
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div
                                key={idx}
                                className="item-attribute-value"
                                style={{
                                  backgroundColor:
                                    item.selectedAttributes?.some(
                                      (attr) =>
                                        attr.name === attribute.name &&
                                        attr.value === attributeItem.value
                                    )
                                      ? "black"
                                      : "",
                                  color: item.selectedAttributes?.some(
                                    (attr) =>
                                      attr.name === attribute.name &&
                                      attr.value === attributeItem.value
                                  )
                                    ? "white"
                                    : "#1D1F22",
                                }}
                              >
                                {attributeItem.value}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <div style={{ width: "100%" }}>
                     
                    </div> */}
              </div>
              <div
                style={{ gap: "10px", width: "30%" }}
                className="flex justify-end"
              >
                <div
                  style={{ height: "100%", flexDirection: "column" }}
                  className="flex  justify-between"
                >
                  <div
                    className="cart-action-button flex items-center justify-center"
                    onClick={() => setCartItem(item)}
                  >
                    +
                  </div>
                  <div className="flex justify-center">{item.quantity}</div>
                  <div
                    className="cart-action-button flex items-center justify-center"
                    onClick={() => removeCartItem(item)}
                  >
                    -
                  </div>
                </div>
                <div className="item-img-container flex items-center">
                  <div
                    style={{
                      backgroundImage: `url(${
                        item?.gallery[this.state.viewImage[idx]?.imageIndex]
                      })`,
                    }}
                    className="item-img"
                  >
                    {item.gallery.length > 1 && (
                      <div className="flex img-arrow-container">
                        <div
                          className="img-arrow flex items-center justify-center"
                          onClick={() => {
                            this.setState((state) => {
                              let image = state.viewImage.map(
                                (viewImageItem) => {
                                  if (viewImageItem.index === idx)
                                    return {
                                      index: viewImageItem.index,
                                      imageIndex:
                                        viewImageItem.imageIndex === 0
                                          ? item?.gallery.length - 1
                                          : viewImageItem.imageIndex - 1,
                                    };
                                  return viewImageItem;
                                }
                              );
                              return { viewImage: image };
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                          >
                            <path
                              d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div
                          className="img-arrow flex items-center justify-center"
                          onClick={() => {
                            this.setState((state) => {
                              let image = state.viewImage.map(
                                (viewImageItem) => {
                                  if (viewImageItem.index === idx)
                                    return {
                                      index: viewImageItem.index,
                                      imageIndex:
                                        viewImageItem.imageIndex ===
                                        item?.gallery.length - 1
                                          ? 0
                                          : viewImageItem.imageIndex + 1,
                                    };
                                  return viewImageItem;
                                }
                              );
                              return { viewImage: image };
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                          >
                            <path
                              d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="cart-report">
          <div className="cart-report-key">
            <div>Tax 21%:</div>
            <div>Quantity:</div>
            <div className="cart-total-price">Total:</div>
          </div>
          <div className="cart-report-value">
            <div>
              {currency.symbol}
              {`${(totalFee * 0.21).toFixed(2)}`}
            </div>
            <div>{`${totalQuantity}`}</div>
            <div>
              {currency.symbol}
              {`${(totalFee + totalFee * 0.21).toFixed(2)}`}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <button className="order-button" onClick={() => this.order(cartItem)}>
            ORDER
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItem: state.cartSlice.product,
  totalQuantity: state.cartSlice.totalQuantity,
  totalFee: state.cartSlice.total,
  currency: state.currencySlice.currency,
});
const mapDispatch = {
  removeCartItem: removeProductFromCart,
  setCartItem: setCart,
  resetCartState: reset,
};
export default connect(mapStateToProps, mapDispatch)(CartDetail);
