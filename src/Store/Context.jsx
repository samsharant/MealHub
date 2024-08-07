import { createContext, useReducer } from "react";
import { generateOrderNumber } from "../utils";

const ShopContext = createContext();

const initialState = {
  categories: [],
  items: {},
  itemDetails: {},
  cart: [],
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_ITEMS":
      return {
        ...state,
        items: { ...state.items, [action.category]: action.payload },
      };
    case "SET_ITEM_DETAILS":
      return {
        ...state,
        itemDetails: { ...state.itemDetails, [action.id]: action.payload },
      };
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "INCREMENT_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.idMeal === action.payload.mealId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };
    case "DECREMENT_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.idMeal === action.payload.mealId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "PLACE_ORDER":
      const uniqueOrderId = generateOrderNumber();
      return {
        ...state,
        orders: [...state.orders, { uniqueOrderId, items: [...state.cart] }],
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export { ShopContext, ShopProvider };
