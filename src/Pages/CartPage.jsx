import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemsByCatetgoryURL } from "../utils";
import { Box, Button } from "@mui/material";

function CartPage() {
  const { state, dispatch } = useContext(ShopContext);

  const [cartItems, setCartItems] = useState([]);

  //   useEffect(() => {
  //     if (responseData) {
  //       dispatch({
  //         type: "SET_ITEMS",
  //         category: categoryName,
  //         payload: responseData.meals,
  //       });
  //     }
  //   }, [responseData, categoryName, dispatch]);

  const RemoveFromCart = (mealId) => {
    // dispatch({
    //   type: "ADD_ITEM_TO_CART",
    //   payload: {
    //     mealId,
    //     categoryName,
    //     quantity: 1,
    //   },
    // });
  };

  console.log(state.cart, "-- cart --");

  useEffect(() => {
    const allItems = state.items;
    const tempCartItems = [];
    for (const item of state.cart) {
      const { mealId, categoryName, quantity } = item;
      const mealItem = allItems[categoryName].find(
        (item) => item.idMeal === mealId
      );
      tempCartItems.push({ ...mealItem, quantity });
    }
    setCartItems(tempCartItems);
  }, []);

  console.log(cartItems, "---------build items");

  return (
    <div>
      {cartItems.map((meal) => (
        <>
          <div>
            <h5>{meal.strMeal}</h5>
            <img
              style={{ height: "250px" }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <h3>{meal.quantity}</h3>
          </div>
        </>
      ))}
      <Link to={"/orders"}>
        <Button variant={"outlined"}>Place order</Button>{" "}
      </Link>
    </div>
  );
}

export default CartPage;
