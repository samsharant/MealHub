import { useContext, useEffect } from "react";
import { ShopContext } from "../../Store/Context";
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const { state, dispatch } = useContext(ShopContext);

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <div className={styles.OrdersWrapper}>
      Orders History
      {state.orders.map((order) => {
        return (
          <div className={styles.OrderListWrapper}>
            <h3>{order.uniqueOrderId}</h3>
            {order.items?.map((item) => (
              <CartItemCard item={item} readOnly={true} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPage;
