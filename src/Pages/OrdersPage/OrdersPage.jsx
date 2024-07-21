import { useContext, useEffect } from "react";
import { ShopContext } from "../../Store/Context";
import { Typography } from "@mui/material";
import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const { state, dispatch } = useContext(ShopContext);

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <div className={styles.OrdersWrapper}>
      {state.orders.map((order) => {
        return (
          <div className={styles.OrderListWrapper}>
            <h3>Order ID: #{order.uniqueOrderId}</h3>
            {order.items?.map((item) => (
              <div className={styles.CardWrapper}>
                <div className={styles.ImgContainer}>
                  <img src={item.strMealThumb} alt={item.strMeal} />
                </div>
                <div className={styles.ContentContainer}>
                  <Typography>{item.strMeal}</Typography>
                  <Typography sx={{ color: "gray" }}>
                    Qty: {item.quantity}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPage;
