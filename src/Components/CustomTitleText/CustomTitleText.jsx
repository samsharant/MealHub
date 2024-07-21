import styles from "./CustomTitleText.module.css";

function CustomTitleText({ title }) {
  return <h3 className={styles.TitleText}>{title}</h3>;
}

export default CustomTitleText;
