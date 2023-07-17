import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "businesses/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "businesses/RECEIVE_BUSINESS";

export const RECEIVE_ERRORS = "businesses/RECEIVE_ERRORS";

export const receiveBusinesses = (businesses) => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveBusiness = (business) => ({
  type: RECEIVE_BUSINESS,
  business
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const getBusiness =
  (businessId) =>
  ({ businesses }) => {
    if (businesses.errors) return businesses.errors;
    return businesses[businessId];
  };

export const getBusinesses = ({ businesses }) => {
  // debugger;
  return businesses ? Object.values(businesses) : [];
};

export const fetchBusinesses = () => async (dispatch) => {
  // debugger;
  const res = await csrfFetch("/api/businesses");
  let data;
  if (res.ok) {
    data = await res.json();
    // debugger;
    dispatch(receiveBusinesses(data));
  } else {
    data = res.errors;
  }
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`).catch((errors) =>
    dispatch(receiveErrors(errors))
  );
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusiness(data));
  } // else {
  // const errors = await res.statusText;
  //dispatch(receiveErrors(errors));
  // }
};

const businessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...newState, ...action.businesses };
    case RECEIVE_BUSINESS:
      // if (action.)
      if (action.business.id) newState[action.business.id] = action.business;
      else newState.errors = action.business;
      // newState[]
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return { ...newState, ...action.errors };
    default:
      return preloadedState;
  }
};

export default businessesReducer;
