import {createSelector} from "reselect";

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getCustomerId = createSelector(
  [usersSelector],
  state => state.customer_id
);

export const getPaymentMethodId= createSelector(
  [usersSelector],
  state => state.payment_method_id
);

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
)

export const getOrderHistory = createSelector(
  [usersSelector],
  state => state.orders
)


export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getRole = createSelector(
  [usersSelector],
  state => state.role
);

export const getEmail = createSelector(
  [usersSelector],
  state => state.email
);


export const getUsername = createSelector([usersSelector], (state) => state.username);