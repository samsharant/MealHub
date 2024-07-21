import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Store/Context";
import styles from "../CartPage/CartPage.module.css";
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import { Typography } from "@mui/material";
import CustomTitleText from "../../Components/CustomTitleText/CustomTitleText";
import { CustomMUIButton } from "../../Components/CommonStyles";

function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);
  const [subTotal, setSubTotal] = useState(0);
  const deliveryCharge = 60;

  const handlePlaceOrder = () => {
    dispatch({ type: "PLACE_ORDER" });
    navigate("/orders", { replace: true });
  };

  useEffect(() => {
    // Calculate the subtotal
    const newSubTotal = state.cart.reduce((acc, item) => {
      const price = item.priceMeal;
      return acc + (price ? price * item.quantity : 0); // Assuming `price` and `quantity` properties
    }, 0);
    setSubTotal(newSubTotal);
  }, [state.cart]);

  return state.cart.length ? (
    <div className={styles.CartWrapper}>
      <div className={styles.CartItemsWrapper}>
        {state.cart?.map((item) => (
          <CartItemCard key={item.idMeal} item={item} />
        ))}
      </div>

      <div className={styles.CartSummaryWrapper}>
        <div className={styles.SummaryContainer}>
          <div className={styles.PriceBreakdownContainer}>
            <div>
              <Typography>{`Price (${state.cart.length} Items)`}</Typography>
              <Typography>₹{subTotal}</Typography>
            </div>

            <div>
              <Typography>{`Delivery Charges`}</Typography>
              <Typography>₹{deliveryCharge}</Typography>
            </div>
          </div>

          <div className={styles.TotalAmountContainer}>
            <Typography sx={{ fontWeight: 600 }}>{`Total amount`}</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              ₹{subTotal + deliveryCharge}
            </Typography>
          </div>
        </div>
        <CustomMUIButton variant={"outlined"} onClick={handlePlaceOrder}>
          Place order
        </CustomMUIButton>
      </div>
    </div>
  ) : (
    <CustomTitleText title={"Looks empty here!"} />
  );
}

export default CartPage;
