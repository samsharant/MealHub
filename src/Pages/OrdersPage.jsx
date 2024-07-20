import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { ShopContext } from "../Store/Context";
import { getItemsByCatetgoryURL } from "../utils";
import { Box, Button } from "@mui/material";

function OrdersPage() {
  const { state, dispatch } = useContext(ShopContext);
  console.log("order placed -> ", state.cart);
  return (
    <div>
      <h1>orders</h1>
    </div>
  );
}

export default OrdersPage;
