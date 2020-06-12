const initialState = {
  products: [
    {
      age: 0,
      id: "motorola-xoom-with-wi-fi",
      imageUrl: "img/phones/motorola-xoom-with-wi-fi.0.jpg",
      name: "Motorola XOOM\u2122 with Wi-Fi",
      snippet:
        "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
    }
  ],
  filteredProduct: [],
  manufactureDetails: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ONLOAD":
      return {
        ...state,
        products: action.payload.catalogEntryView,
        manufactureDetails: action.payload.facetView[1].entry
      };
    case "ON_SEARCH_FILTER":
      return {
        ...state,
        filteredProduct: state.products.filter(item => {
          return (
            item["name"].toLowerCase().search(action.text.toLowerCase()) !== -1
          );
        })
      };
    default:
      return state;
  }
};
export default productsReducer;
