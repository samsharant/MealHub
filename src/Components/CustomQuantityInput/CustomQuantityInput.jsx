import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decrementQuantity, incrementQuantity } from "../../Store/Actions";
import { useContext } from "react";
import { ShopContext } from "../../Store/Context";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

function CustomQuantityInput(props) {
  const { item, itemQty, width, height } = props;
  const { dispatch } = useContext(ShopContext);

  const QuantityWrapper = styled(Box)({
    width: width || "100%",
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--green)",
    borderRadius: "4px",
    overflow: "hidden",
  });

  const QuantityButton = styled(Button)({
    minWidth: "40px",
    height: height || "40px",
    backgroundColor: "var(--green)",
    color: "#fff",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#43666f", // Maintain the same green color on hover
    },
  });

  const QuantityDisplay = styled(Typography)({
    padding: "0 20px",
    width: "100%",
    textAlign: "center",
    color: "var(--green)",
    fontSize: "1rem",
    fontWeight: "bold",
  });

  return (
    <QuantityWrapper>
      <QuantityButton
        variant="contained"
        onClick={() => decrementQuantity(item.idMeal, dispatch)}
      >
        {itemQty === 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
      </QuantityButton>
      <QuantityDisplay>{itemQty}</QuantityDisplay>
      <QuantityButton
        variant="contained"
        onClick={() => incrementQuantity(item.idMeal, dispatch)}
      >
        <AddIcon />
      </QuantityButton>
    </QuantityWrapper>
  );
}

export default CustomQuantityInput;
