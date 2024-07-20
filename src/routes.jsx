import CategoriesPage from "./Pages/CategoriesPage";
import ItemsPage from "./Pages/ItemsPage";

export const routes = [
  { path: "/", element: <CategoriesPage /> },
  { path: "/items/:category", element: <ItemsPage /> },
];
