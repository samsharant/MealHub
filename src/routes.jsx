import CartPage from "./Pages/CartPage/CartPage";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import ItemDetailsPage from "./Pages/ItemDetailsPage/ItemDetailsPage";
import ItemsPage from "./Pages/ItemsPage/ItemsPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";

export const routes = [
  { path: "/", element: <CategoriesPage /> },
  { path: "/items/:categoryName", element: <ItemsPage /> },
  { path: "/item/detail/:mealId", element: <ItemDetailsPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/orders", element: <OrdersPage /> },
];
