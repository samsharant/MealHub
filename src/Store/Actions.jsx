export const addToCart = (meal, dispatch) => {
  dispatch({
    type: "ADD_ITEM_TO_CART",
    payload: { ...meal, quantity: 1 },
  });
};

export const incrementQuantity = (mealId, dispatch) => {
  dispatch({
    type: "INCREMENT_ITEM_QUANTITY",
    payload: { mealId },
  });
};

export const decrementQuantity = (mealId, dispatch) => {
  dispatch({
    type: "DECREMENT_ITEM_QUANTITY",
    payload: { mealId },
  });
};
