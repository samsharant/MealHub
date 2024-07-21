import { useNavigate } from "react-router-dom";
import styles from "./ListItemCard.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Store/Context";
import { styled } from "@mui/system";
import { addToCart } from "../../Store/Actions";
import CustomQuantityInput from "../CustomQuantityInput/CustomQuantityInput";
import { CustomMUIButton } from "../CommonStyles";

function ListItemCard(props) {
  const { item } = props;
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);
  const cartItems = state.cart;
  const [itemQty, setItemQty] = useState(null);

  useEffect(() => {
    const itemInCart = cartItems?.find(
      (cartItem) => cartItem.idMeal === item.idMeal
    );
    if (itemInCart) {
      setItemQty(itemInCart.quantity);
    }
  }, state.cartItem);

  const navigateToItemDetails = () => {
    navigate(`/item/detail/${item.idMeal}`);
  };

  const isItemAddedToCart = (item) => {
    if (!cartItems.length) return false;
    return !!cartItems?.some((cartItem) => cartItem.idMeal === item.idMeal);
  };

  const renderAddToCart = (item) => {
    return (
      <CustomMUIButton
        sx={{ width: "100%" }}
        variant={"outlined"}
        onClick={() => addToCart(item, dispatch)}
      >
        add to cart
      </CustomMUIButton>
    );
  };

  const renderAddToCartQty = (item) => {
    return <CustomQuantityInput item={item} itemQty={itemQty} width={"100%"} />;
  };

  return (
    <div className={styles.ListItemCardWrapper}>
      <div
        className={styles.ListItemContentContainer}
        onClick={navigateToItemDetails}
      >
        <img src={item.strMealThumb} alt={item.strMeal} />
        <Box className={styles.ListItemTitleContainer}>
          <Typography sx={{ fontWeight: 600 }}>{item.strMeal}</Typography>
          <Typography>Price: ₹{item.priceMeal}</Typography>
        </Box>
      </div>
      {!isItemAddedToCart(item) ? (
        <Box sx={{ width: "100%" }}>{renderAddToCart(item)}</Box>
      ) : (
        renderAddToCartQty(item)
      )}
    </div>
  );
}

export default ListItemCard;
