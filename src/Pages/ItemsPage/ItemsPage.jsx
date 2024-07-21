import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { ShopContext } from "../../Store/Context";
import { getItemsByCatetgoryURL, getRandomPrice } from "../../utils";
import styles from "./ItemsPage.module.css";
import ListItemCard from "../../Components/ListItemCard/ListItemCard";
import CustomTitleText from "../../Components/CustomTitleText/CustomTitleText";

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
      const updatedResponseDataWithPrices = responseData.meals?.map((item) => {
        item.priceMeal = getRandomPrice();
        return item;
      });
      dispatch({
        type: "SET_ITEMS",
        category: categoryName,
        payload: updatedResponseDataWithPrices,
      });
    }
  }, [responseData, categoryName, dispatch]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <CustomTitleText title={"Loading..."} />;

  const items = state.items[categoryName] || [];
  return (
    <div className={styles.CategoryItemsWrapper}>
      {items.map((item) => (
        <ListItemCard key={item.idMeal} item={item} />
      ))}
    </div>
  );
}

export default ItemsPage;
