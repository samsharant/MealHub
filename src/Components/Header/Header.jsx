import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { Badge } from "@mui/material";
import { useContext } from "react";
import { ShopContext } from "../../Store/Context";

function Header() {
  const { state } = useContext(ShopContext);
  const cartItemsCount = state.cart.length;
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer} onClick={navigateToHome}>
          <LocalPizzaIcon sx={{ fontSize: "2rem" }} /> MealHub
        </div>
        <div className={styles.cartContainer} onClick={navigateToCart}>
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </div>
      </div>
    </header>
  );
}

export default Header;
