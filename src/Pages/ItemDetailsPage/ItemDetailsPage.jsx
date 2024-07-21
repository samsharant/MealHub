import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { ShopContext } from "../../Store/Context";
import {
  getItemByIdURL,
  getMealDescription,
  getRandomPrice,
} from "../../utils";
import { Box, Button, Typography } from "@mui/material";
import styles from "./ItemDetailsPage.module.css";
import { styled } from "@mui/system";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

  const QuantityWrapper = styled(Box)({
    width: "30%",
    display: "flex",
    alignItems: "center",
    border: "1px solid blue", // Match the color as in the reference image
    borderRadius: "4px",
    overflow: "hidden",
  });

  const QuantityButton = styled(Button)({
    minWidth: "40px",
    height: "40px",
    // backgroundColor: "#ffe5ec", // Light pink background
    // color: "#ff4081", // Match the color as in the reference image
    borderRadius: 0,
  });

  const QuantityDisplay = styled(Typography)({
    padding: "0 20px",
    width: "100%",
    textAlign: "center",
    // color: "#ff4081", // Match the color as in the reference image
    fontSize: "1rem",
    fontWeight: "bold",
  });

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

  const addToCart = (meal) => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: { ...meal, quantity: 1 },
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

  const isItemAddedToCart = (item) => {
    if (!cartItems.length) return false;
    return !!cartItems?.some((cartItem) => cartItem.idMeal === item.idMeal);
  };

  const renderAddToCart = (item) => {
    return (
      <Button
        sx={{ width: "100%" }}
        variant={"outlined"}
        onClick={() => addToCart(item)}
      >
        add to cart
      </Button>
    );
  };

  const renderAddToCartQty = (item) => {
    return (
      <QuantityWrapper>
        <QuantityButton
          variant="contained"
          onClick={() => decrementQuantity(item.idMeal)}
        >
          {itemQty === 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
        </QuantityButton>
        <QuantityDisplay>{itemQty}</QuantityDisplay>
        <QuantityButton
          variant="contained"
          onClick={() => incrementQuantity(item.idMeal)}
        >
          <AddIcon />
        </QuantityButton>
      </QuantityWrapper>
    );
  };

  return (
    // <div>
    //   <img
    //     style={{ height: "50px" }}
    //     src={meal.strMealThumb}
    //     alt={meal.strMeal}
    //   />
    //   <Button>add to cart</Button>
    // </div>

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
            <Button disabled variant="outlined" sx={{ width: "60%" }}>
              Added to cart
            </Button>
            {renderAddToCartQty(itemDetails)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetailPage;
