import { useNavigate } from "react-router-dom";
import styles from "./CartItemCard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Store/Context";
import { styled } from "@mui/system";

function CartItemCard(props) {
  const { item, readOnly } = props;
  const { state, dispatch } = useContext(ShopContext);
  const cartItems = state.cart;
  const [itemQty, setItemQty] = useState(null);

  const QuantityWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    border: "1px solid blue", // Match the color as in the reference image
    borderRadius: "4px",
    overflow: "hidden",
    width: "130px",
  });

  const QuantityButton = styled(Button)({
    minWidth: "40px",
    height: "20px",
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
      (cartItem) => cartItem.idMeal === item.idMeal
    );
    if (itemInCart) {
      setItemQty(itemInCart.quantity);
    }
  }, state.cartItem);

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
    <div className={styles.CartItemCardWrapper}>
      <div className={styles.ImgContainer}>
        <img src={item.strMealThumb} alt={item.strMeal} />
      </div>
      <div className={styles.ContentContainer}>
        <Typography>{item.strMeal}</Typography>
        {!readOnly && <Typography> Price: {item.priceMeal}</Typography>}
        {!readOnly && renderAddToCartQty(item)}
      </div>

      {/* <div className={styles.BtnsContainer}>{}</div> */}
    </div>
  );
}

export default CartItemCard;