import React from "react";
import { connect } from "react-redux";
import { fetchDataOnload, filteredData } from "../actions/dashBoardActions";
import ProductList from "./ProductList";
const mapStateToProps = state => ({
  products: state.productsReducer.products,
  filterdata: state.productsReducer.filteredProduct,
  manufactureDetails: state.productsReducer.manufactureDetails
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: "",
      showFIlters: true,
      selectedList: []
    };
    this.onSearchHandle = this.onSearchHandle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.showHideFiltersOnToggle = this.showHideFiltersOnToggle.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(fetchDataOnload());
  }

  showHideFiltersOnToggle() {
    let showFIlters = this.state.showFIlters;
    this.setState({ showFIlters: !showFIlters });
  }
  onSearchHandle(e) {
    const { value } = e.target;
    this.setState({ search: value });
    this.props.dispatch(filteredData(value));
  }
  onSelect(item) {
    let selectedList = this.state.selectedList;
    let index = selectedList.findIndex(obj => obj.uniqueID === item.uniqueID);
    if (index === -1) {
      selectedList.push(item);
      this.setState({ selectedList });
    }
  }
  deleteSelected(index) {
    let selectedList = this.state.selectedList;
    selectedList.splice(index, 1);
    this.setState({ selectedList });
  }

  render() {
    const products = !this.state.search
      ? this.props.products
      : this.props.filterdata;
    console.log(this.props.products);
    return (
      <div className="dashboard">
        <nav className="navbar navbar-expand-md bg-primary">
          <div className="navbar-brand text-white">Products</div>

          <div className="collapse navbar-collapse">
            <form className="navbar-form ml-auto" role="search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter products"
                  name="q"
                  onChange={this.onSearchHandle}
                />
              </div>
            </form>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card filterSection">
                <div className="card-header bg-white  text-white">
                  <button
                    onClick={this.showHideFiltersOnToggle}
                    className="btn btn-danger text-uppercase w-100"
                  >
                    {this.state.showFIlters ? "FIlters" : "Hide Filters"}
                  </button>
                </div>
                {this.state.showFIlters && (
                  <div className="card-body">
                    <h5>Selected Items</h5>
                    <ul className="list-group">
                      {this.state.selectedList.map((item, index) => (
                        <li key={`${index}_list`} className="list-group-item">
                          {item.name}
                          <button
                            className="close"
                            onClick={() => this.deleteSelected(index)}
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                    <h5>Manufacturer name</h5>
                    <ul className="list-group">
                      {this.props.manufactureDetails &&
                        this.props.manufactureDetails.map((item, index) => (
                          <li key={index} className="list-group-item">
                            {item.label}{" "}
                            <span className="badge-count">{item.count}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-9">
              <ProductList data={products} onProductSelect={this.onSelect} />
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard);
