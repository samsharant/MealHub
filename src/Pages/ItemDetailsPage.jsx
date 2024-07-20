import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemByIdURL } from "../utils";
import { Button } from "@mui/material";

function ItemDetailPage() {
  const { mealId } = useParams();
  const { state, dispatch } = useContext(ShopContext);
  const shouldFetch = !state.itemDetails[mealId];
  const { responseData, loading, error } = useFetch(
    getItemByIdURL(mealId),
    shouldFetch
  );

  useEffect(() => {
    if (responseData) {
      dispatch({
        type: "SET_ITEM_DETAILS",
        id: mealId,
        payload: responseData.meals,
      });
    }
  }, [responseData, mealId, dispatch]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  const meal = state.itemDetails[mealId] ? state.itemDetails[mealId][0] : {};
  return (
    <div>
      <h5>{meal.strMeal}</h5>
      <img
        style={{ height: "50px" }}
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <Button>add to cart</Button>
    </div>
  );
}

export default ItemDetailPage;
