import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { categoriesAPI, getItemsByCatetgoryAPI } from "../utils";

function ItemsPage() {
  const { category } = useParams();
  const url = getItemsByCatetgoryAPI(category);
  // const { shopData, dispatch } = useContext(ShopContext);
  const { responseData, loading, error } = useFetch(url);

  // useEffect(() => {
  //   dispatch({ type: "set_categories_list", payload: responseData });
  // }, [responseData, dispatch]);

  if (error) return <p>Error: {error.message}</p>;

  return loading ? (
    <p>Loading...</p>
  ) : (
    responseData.meals.map((meal) => (
      <div>
        <h5>{meal.strMeal}</h5>
        <img src={meal.strMealThumb} />
      </div>
    ))
  );
}

export default ItemsPage;
