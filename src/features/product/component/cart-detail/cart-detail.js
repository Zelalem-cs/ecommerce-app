import React from "react";
import "./cart-detail.css";
import { connect } from "react-redux";
import { removeProductFromCart, setCart } from "../../../../shared/store/slices/cart-slice";

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewImage: [] };
  }
  componentDidMount() {
    const viewImage = this.props.cartItem.map((item,idx) => {
      return { index:idx , imageIndex: 0 };
    });
    this.setState({ viewImage: viewImage });
  }
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", color: "#1D1F22",fontFamily:'Raleway' }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "32px",
            marginBottom: "55px",
            textTransform:'uppercase'
          }}
        >
          Cart
        </div>
        {this.props.cartItem.map((item, idx) => {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderTop: "solid #E5E5E5 1px",
                borderBottom: "solid #E5E5E5 1px",
                padding: "24px 0 24px 0",
              }}
              className="cart-item flex justify-between"
              key={idx}
            >
              <div className="item-description">
                <div
                  style={{ width: "100%", gap: "5px", flexDirection: "column" }}
                  className="flex"
                >
                  <div
                    className="item-name"
                    style={{ fontWeight: 600, fontSize: "30px" }}
                  >{`${item.brand}`}</div>
                  <div
                    className="item-name"
                    style={{ fontWeight: 400, fontSize: "30px" }}
                  >{`${item.name}`}</div>
                </div>
                <div style={{ width: "100%" }} className="flex justify-between">
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "24px",
                      lineHeight: "25.6px",
                    }}
                  >
                    {item.prices.map(
                      (price) =>
                        price.currency.symbol === JSON.parse(window.localStorage.currency) &&
                        `${price.currency.symbol} ${price.amount}`
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      gap: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {item.attributes.map((attribute, index) => {
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
                            <div
                              style={{
                                width: "100%",
                                fontWeight: 700,
                                fontSize: "18px",
                                fontFamily: "Roboto Condensed",
                                textTransform:'uppercase'
                              }}
                            >
                              {attribute.name}:
                            </div>
                            <div
                              style={{ width: "100%", gap: "5px" }}
                              className="flex items-center "
                            >
                              {attribute.items.map((attributeItem, idx) =>
                                attribute.name === "Color" ? (
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
                                    style={{
                                      border: "solid 1.7px",
                                      width: "fit-content",
                                      padding: "14px",
                                      height: "fit-content",
                                      fontFamily: "Source Sans Pro",
                                      fontStyle: "normal",
                                      fontSize: "16px",
                                      fontWeight: "400",
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
                        </div>
                      );
                    })}
                  </div>
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
                    style={{
                      border: "solid thin",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      fontSize:'24px'
                    }}
                    className="flex items-center justify-center"
                    onClick={() => this.props.setCartItem(item)}
                  >
                    +
                  </div>
                  <div className="flex justify-center">{item.quantity}</div>
                  <div
                    style={{
                      border: "solid thin",
                      minWidth: "40px",
                      height: "40px",
                      cursor: "pointer",
                      fontSize:'24px'
                    }}
                    className="flex items-center justify-center"
                    onClick={() => this.props.removeCartItem(item)}
                  >
                    -
                  </div>
                </div>
                <div className="item-img flex items-center">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${
                        item?.gallery[this.state.viewImage[idx]?.imageIndex]
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                  >
                    {item.gallery.length > 1 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 4,
                          right: 4,
                          gap: "5px",
                        }}
                        className="flex "
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.73)",
                            padding: "2px",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                          }}
                          className="flex items-center justify-center"
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
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.73)",
                            padding: "2px",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                          }}
                          className="flex items-center justify-center"
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
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontFamily: "Raleway",
          }}
        >
          <div style={{fontWeight:'400',fontSize:'24px',lineHeight:'28px'}}>Tax 21%: {`${(this.props.totalFee*0.21).toFixed(2)}`}</div>
          <div style={{fontWeight:'400',fontSize:'24px',lineHeight:'28px'}}>{`Quantity: ${this.props.totalQuantity}`}</div>
          <div style={{fontWeight:'500',fontSize:'24px',color:'#1D1F22',lineHeight:'28px'}}>Total: {`${(this.props.totalFee + (this.props.totalFee*0.21)).toFixed(2)}`}</div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <button
            style={{
              width: "279px",
              height: "43px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:'#5ECE7B',
              border:'none',
              color:'#FFFFFF',
              fontSize:'14px',
              fontWeight:'600'
            }}
          >
            ORDER
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItem: state.cartSlice.product,
  totalQuantity:state.cartSlice.totalQuantity,
  totalFee:state.cartSlice.total
});
const mapDispatch = {
  removeCartItem: removeProductFromCart,
  setCartItem:setCart,
};
export default connect(mapStateToProps, mapDispatch)(CartDetail);