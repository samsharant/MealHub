import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to={"/cart"}>
        <ShoppingCartOutlinedIcon />
      </Link>
    </div>
  );
}

export default Header;
