import React from "react";
const bgStyle = source => {
  return {
    backgroundImage: `url(${source})`
  };
};
class ProductList extends React.Component {
  selectProduct = item => {
    this.props.onProductSelect(item);
  };
  render() {
    return (
      <div className="row">
        {this.props.data.map((item, index) => (
          <div
            key={`${item.uniqueID}_product`}
            className="col-xs-12 col-sm-4 col-md-3"
            onClick={() => this.selectProduct(item)}
          >
            <div className="card productGrid">
              <div
                className="thumbnail"
                style={bgStyle(
                  `https://www.demo.salmon-gcp.com${item.thumbnail}`
                )}
              ></div>

              <div className="card-body">
                <h6 className="card-title">{item.name}</h6>
              </div>
              <div className="card-footer">
                {item.price && (
                  <div className="card-text">
                    {item.price.map((val, i) => (
                      <p key={`${i}_pricej`} className="m-0">
                        {val.usage === "Display" ? "Price List: " : "price: "}
                        {val.usage === "Display" ? (
                          <del>{val.value}</del>
                        ) : (
                          <span>{val.value}</span>
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;
