import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemsByCatetgoryURL } from "../utils";
import { Box, Button } from "@mui/material";

function OrdersPage() {
  const { state, dispatch } = useContext(ShopContext);

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <div>
      Orders History
      {state.orders.map((order) => {
        return (
          <>
            <h3>{order.uniqueOrderId}</h3>
            {order.items?.map((meal) => (
              <>
                <div>
                  <h5>{meal.strMeal}</h5>
                  <img
                    style={{ height: "250px" }}
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                </div>
              </>
            ))}
          </>
        );
      })}
    </div>
  );
}

export default OrdersPage;
