import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Store/Context";
import { Button } from "@mui/material";
import styles from "../CartPage/CartPage.module.css";
import CartItemCard from "../../Components/CartItemCard/CartItemCard";

function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);

  const handlePlaceOrder = () => {
    dispatch({ type: "PLACE_ORDER" });
    navigate("/orders", { replace: true });
  };

  return (
    <div className={styles.CartWrapper}>
      <div className={styles.CartItemsWrapper}>
        {state.cart?.map((item) => (
          <CartItemCard item={item} />
        ))}
      </div>

      <div className={styles.CartSummaryWrapper}>
        <div className={styles.SummaryContainer}></div>
        <Button variant={"outlined"} onClick={handlePlaceOrder}>
          Place order
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
