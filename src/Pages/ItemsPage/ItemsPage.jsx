import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { ShopContext } from "../../Store/Context";
import { getItemsByCatetgoryURL, getRandomPrice } from "../../utils";
import { Box, Button } from "@mui/material";
import styles from "./ItemsPage.module.css";
import ListItemCard from "../../Components/ListItemCard/ListItemCard";

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

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  const items = state.items[categoryName] || [];
  return (
    <div className={styles.CategoryItemsWrapper}>
      {items.map((item) => (
        <ListItemCard item={item} />
      ))}
    </div>
  );
}

export default ItemsPage;
