import { useNavigate } from "react-router-dom";
import styles from "./CartItemCard.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Store/Context";
import { styled } from "@mui/system";
import { decrementQuantity, incrementQuantity } from "../../Store/Actions";
import CustomQuantityInput from "../CustomQuantityInput/CustomQuantityInput";

function CartItemCard(props) {
  const { item } = props;
  const { state } = useContext(ShopContext);
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

  const renderAddToCartQty = (item) => {
    return (
      <CustomQuantityInput
        item={item}
        itemQty={itemQty}
        width={"130px"}
        height={"25px"}
      />
    );
  };

  console.log(cartItems);

  return (
    <div className={styles.CartItemCardWrapper}>
      <div className={styles.ImgContainer}>
        <img src={item.strMealThumb} alt={item.strMeal} />
      </div>
      <div className={styles.ContentContainer}>
        <Typography>{item.strMeal}</Typography>
        <Tooltip>
          <Typography>
            Price: ₹
            {item.priceMeal || (
              <span style={{ color: "gray" }}> Data not available</span>
            )}
          </Typography>
        </Tooltip>
        {renderAddToCartQty(item)}
      </div>
    </div>
  );
}

export default CartItemCard;
