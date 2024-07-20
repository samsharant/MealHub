import { useContext, useEffect } from "react";
import { ShopContext } from "../Store/Context";
import useFetch from "../Hooks/useFetch";
import { categoriesURL } from "../utils";
import { Link } from "react-router-dom";

function CategoriesPage() {
  const { state, dispatch } = useContext(ShopContext);
  const shouldFetch = !state.categories.length;
  const { responseData, loading, error } = useFetch(categoriesURL, shouldFetch);

  useEffect(() => {
    if (responseData) {
      dispatch({ type: "SET_CATEGORIES", payload: responseData.categories });
    }
  }, [responseData, dispatch]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return state.categories.map((category) => (
    <Link key={category.strCategory} to={`/items/${category.strCategory}`}>
      <div>
        <h5>{category.strCategory}</h5>
        <img src={category.strCategoryThumb} alt={category.strCategory} />
      </div>
    </Link>
  ));
}

export default CategoriesPage;
