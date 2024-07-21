import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Store/Context";
import { Alert, Snackbar, Typography } from "@mui/material";
import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const { state, dispatch } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={2000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Order Placed!
        </Alert>
      </Snackbar>

      <div className={styles.OrdersWrapper}>
        {state.orders.map((order) => {
          return (
            <div key={order.uniqueOrderId} className={styles.OrderListWrapper}>
              <h3>Order ID: #{order.uniqueOrderId}</h3>
              {order.items?.map((item) => (
                <div key={item.idMeal} className={styles.CardWrapper}>
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
    </>
  );
}

export default OrdersPage;
