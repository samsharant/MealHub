import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemsByCatetgoryURL } from "../utils";
import { Box, Button } from "@mui/material";

function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);

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

  //   useEffect(() => {
  //     const allItems = state.items;
  //     const tempCartItems = [];
  //     for (const item of state.cart) {
  //       const { mealId, categoryName, quantity } = item;
  //       const mealItem = allItems[categoryName].find(
  //         (item) => item.idMeal === mealId
  //       );
  //       tempCartItems.push({ ...mealItem, quantity });
  //     }
  //     setCartItems(tempCartItems);
  //   }, []);

  const handlePlaceOrder = () => {
    dispatch({ type: "PLACE_ORDER" });
    navigate("/orders", { replace: true });
  };

  return (
    <div>
      {state.cart?.map((meal) => (
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
      <Button variant={"outlined"} onClick={handlePlaceOrder}>
        Place order
      </Button>
    </div>
  );
}

export default CartPage;
