import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const CustomMUIButton = styled(Button)({
  borderColor: "var(--green)",
  color: "var(--green)",
  "&:hover": {
    borderColor: "var(--dim-green)",
    color: "var(--dim-green)",
  },
});
