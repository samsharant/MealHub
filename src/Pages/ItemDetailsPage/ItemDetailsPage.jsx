import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { ShopContext } from "../../Store/Context";
import {
  getItemByIdURL,
  getMealDescription,
  getRandomPrice,
} from "../../utils";
import { Button, Typography } from "@mui/material";
import styles from "./ItemDetailsPage.module.css";

import { addToCart } from "../../Store/Actions";
import CustomQuantityInput from "../../Components/CustomQuantityInput/CustomQuantityInput";

function ItemDetailPage() {
  const { mealId } = useParams();
  const { state, dispatch } = useContext(ShopContext);
  const shouldFetch = !state.itemDetails[mealId];
  const { responseData, loading, error } = useFetch(
    getItemByIdURL(mealId),
    shouldFetch
  );
  const cartItems = state.cart;
  const [itemQty, setItemQty] = useState(null);
  const itemDetails = state.itemDetails[mealId]
    ? state.itemDetails[mealId][0]
    : {};

  useEffect(() => {
    const itemInCart = cartItems?.find(
      (cartItem) => cartItem.idMeal === itemDetails.idMeal
    );
    if (itemInCart) {
      setItemQty(itemInCart.quantity);
    }
  }, state.cartItem);

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

  const isItemAddedToCart = (item) => {
    if (!cartItems.length) return false;
    return !!cartItems?.some((cartItem) => cartItem.idMeal === item.idMeal);
  };

  const renderAddToCart = (item) => {
    return (
      <Button
        sx={{ width: "100%" }}
        variant={"outlined"}
        onClick={() => addToCart(item, dispatch)}
      >
        add to cart
      </Button>
    );
  };

  const renderAddToCartQty = (item) => {
    return (
      <CustomQuantityInput item={item} itemQty={itemQty} width={"180px"} />
    );
  };

  return (
    <div className={styles.ItemDetailsWrapper}>
      <div className={styles.ImgWrapper}>
        <img src={itemDetails.strMealThumb} alt={itemDetails.strMeal} />
      </div>

      <div className={styles.ContentWrapper}>
        <div className={styles.ItemDetailsContainer}>
          <h3>{itemDetails.strMeal}</h3>
          <Typography>{getMealDescription(itemDetails.strMeal)}</Typography>
          <h3>Price: {getRandomPrice()}</h3>
        </div>
        {!isItemAddedToCart(itemDetails) ? (
          renderAddToCart(itemDetails)
        ) : (
          <div className={styles.BtnsContainer}>
            {renderAddToCartQty(itemDetails)}
            <Button disabled variant="outlined" sx={{ width: "60%" }}>
              Added to cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetailPage;
