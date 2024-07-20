import CartPage from "./Pages/CartPage";
import CategoriesPage from "./Pages/CategoriesPage";
import ItemDetailsPage from "./Pages/ItemDetailsPage";
import ItemsPage from "./Pages/ItemsPage";
import OrdersPage from "./Pages/OrdersPage";

export const routes = [
  { path: "/", element: <CategoriesPage /> },
  { path: "/items/:categoryName", element: <ItemsPage /> },
  { path: "/item/detail/:mealId", element: <ItemDetailsPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/orders", element: <OrdersPage /> },
];
