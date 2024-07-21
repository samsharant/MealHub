import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./BackBtn.module.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function BackBtn() {
  const navigate = useNavigate();
  const navigateToPrevScreen = () => {
    navigate(-1);
  };
  return (
    <div className={styles.BackBtnContainer}>
      <Box onClick={navigateToPrevScreen}>
        <ArrowBackIcon />
      </Box>
    </div>
  );
}

export default BackBtn;
