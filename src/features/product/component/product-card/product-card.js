import React from "react";
import "./product-card.css";
class ProductCard extends React.Component {
  render() {
    return (
      <div className={`card ${!this.props.inStock && "disabled"}`}>
        {!this.props.inStock && (
          <div className="overlay flex justify-center items-center">
            OUT OF STOCK
          </div>
        )}
        {this.props.inStock && (
          <div className="order-icon" onClick={() => this.props.order(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              width={20}
              height={20}
              fill="#ffffff"
            >
              <g>
                <g>
                  <g>
                    <path d="M439,793.7c-54,0-97.9,43.9-97.9,97.9c0,54,43.9,97.9,97.9,97.9c54,0,97.9-43.9,97.9-97.9C536.8,837.6,492.9,793.7,439,793.7z M439,945.9c-30,0-54.4-24.4-54.4-54.4c0-30,24.4-54.4,54.4-54.4c30,0,54.4,24.4,54.4,54.4C493.3,921.5,468.9,945.9,439,945.9z" />
                    <path d="M745.6,793.7c-54,0-97.9,43.9-97.9,97.9c0,54,43.9,97.9,97.9,97.9c53.9,0,97.9-43.9,97.9-97.9C843.5,837.6,799.6,793.7,745.6,793.7z M745.6,945.9c-30,0-54.4-24.4-54.4-54.4c0-30,24.4-54.4,54.4-54.4c29.9,0,54.4,24.4,54.4,54.4C800,921.5,775.6,945.9,745.6,945.9z" />
                    <path d="M985.4,258.2c-4.1-5.3-10.4-8.3-17.1-8.3H233L172.4,26.7c-0.1-0.5-0.5-0.8-0.7-1.3c-0.5-1.4-1.2-2.7-2-3.9c-0.7-1.2-1.4-2.4-2.3-3.4c-0.9-1-1.9-1.8-3-2.6c-1.1-0.9-2.2-1.7-3.5-2.3c-1.2-0.6-2.5-0.9-3.8-1.3c-1.4-0.4-2.8-0.8-4.3-0.9c-0.5,0-1-0.3-1.5-0.3H31.7c-12,0-21.7,9.7-21.7,21.7s9.7,21.7,21.7,21.7h103l60.5,222.9l108.7,440.3c2.4,9.7,11.1,16.6,21.1,16.6h534.5c10,0,18.7-6.8,21.1-16.6l108.7-440.5C991,270.4,989.5,263.5,985.4,258.2z M842.5,690.4H342.1l-98-397h696.4L842.5,690.4z" />
                  </g>
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </g>
            </svg>
          </div>
        )}
        <div
          style={{
            backgroundImage: `url(${this.props.url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "330px",
            width: "300px",
          }}
        ></div>
        <div className="product-name">{this.props.name}</div>
        <div className="product-cost">
          {this.props.sign}
          {this.props.amount}
        </div>
      </div>
    );
  }
}
export default ProductCard;
