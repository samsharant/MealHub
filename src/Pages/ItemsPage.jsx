import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemsByCatetgoryURL } from "../utils";
import { Box, Button } from "@mui/material";

function ItemsPage() {
  const { categoryName } = useParams();
  const { state, dispatch } = useContext(ShopContext);
  const shouldFetch =
    !state.items[categoryName] || !state.items[categoryName].length;
  const { responseData, loading, error } = useFetch(
    getItemsByCatetgoryURL(categoryName),
    shouldFetch
  );

  useEffect(() => {
    if (responseData) {
      dispatch({
        type: "SET_ITEMS",
        category: categoryName,
        payload: responseData.meals,
      });
    }
  }, [responseData, categoryName, dispatch]);

  const addToCart = (mealId) => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: {
        mealId,
        categoryName,
        quantity: 1,
      },
    });
  };

  const incrementQuantity = (mealId) => {
    dispatch({
      type: "INCREMENT_ITEM_QUANTITY",
      payload: { mealId },
    });
  };

  const decrementQuantity = (mealId) => {
    dispatch({
      type: "DECREMENT_ITEM_QUANTITY",
      payload: { mealId },
    });
  };

  console.log(state.cart);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  const items = state.items[categoryName] || [];
  return items.map((meal) => (
    <>
      <Link key={meal.idMeal} to={`/item/detail/${meal.idMeal}`}>
        <div>
          <h5>{meal.strMeal}</h5>
          <img
            style={{ height: "250px" }}
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </div>
      </Link>
      <Box sx={{ display: "flex" }}>
        <Button
          variant={"outlined"}
          onClick={() => incrementQuantity(meal.idMeal)}
        >
          +
        </Button>
        <Button variant={"outlined"} onClick={() => addToCart(meal.idMeal)}>
          add to cart
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => decrementQuantity(meal.idMeal)}
        >
          -
        </Button>
      </Box>
    </>
  ));
}

export default ItemsPage;
