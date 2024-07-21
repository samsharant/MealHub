import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Store/Context";
import { Button } from "@mui/material";
import styles from "../CartPage/CartPage.module.css";
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import { Typography } from "@mui/material";

function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);

  const handlePlaceOrder = () => {
    dispatch({ type: "PLACE_ORDER" });
    navigate("/orders", { replace: true });
  };

  return state.cart.length ? (
    <div className={styles.CartWrapper}>
      <div className={styles.CartItemsWrapper}>
        {state.cart?.map((item) => (
          <CartItemCard item={item} />
        ))}
      </div>

      <div className={styles.CartSummaryWrapper}>
        <div className={styles.SummaryContainer}>
          <div className={styles.PriceBreakdownContainer}>
            <div>
              <Typography>{`Price (${state.cart.length} Items)`}</Typography>
              <Typography>4560</Typography>
            </div>

            <div>
              <Typography>{`Delivery Charges`}</Typography>
              <Typography>60</Typography>
            </div>
          </div>

          <div className={styles.TotalAmountContainer}>
            <Typography>{`Total amount`}</Typography>
            <Typography>5000</Typography>
          </div>
        </div>
        <Button variant={"outlined"} onClick={handlePlaceOrder}>
          Place order
        </Button>
      </div>
    </div>
  ) : (
    <h3>Looks empty here!</h3>
  );
}

export default CartPage;
