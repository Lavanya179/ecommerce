// pull rest API data on button click
export const fetchDataOnload = () => dispatch => {
  fetch(
    // "https://angular.github.io/angular-phonecat/step-9/app/phones/phones.json"
    "https://www.demo.salmon-gcp.com/search/resources/store/1/productview/byCategory/10023?langId=-1&amp;catalogId=10502&amp;currency=USD&amp;responseFormat=json"
  )
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: "FETCH_ONLOAD",
        payload: res
      })
    );
};
/* this method for filter products while searching on input */
export const filteredData = text => ({
  type: "ON_SEARCH_FILTER",
  text
});
