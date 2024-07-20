import { createContext, useReducer } from "react";

const ShopContext = createContext();

const initialState = {
  //items: [],
  //cart: [],
  //orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_items_list":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

function ShopProvider({ children }) {
  const [shopData, dispatch] = useReducer(reducer, initialState);

  return (
    <ShopContext.Provider value={{ shopData, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export { ShopContext, ShopProvider };
