import { useNavigate } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard(props) {
  const { category } = props;
  const navigate = useNavigate();

  const navigateToCategoryItems = () => {
    navigate(`/items/${category.strCategory}`);
  };

  return (
    <div className={styles.CategoryCardWrapper}>
      <div
        className={styles.CategoryImageContainer}
        key={category.strCategory}
        onClick={navigateToCategoryItems}
      >
        <img src={category.strCategoryThumb} alt={category.strCategory} />
      </div>
      <div className={styles.CategoryNameContainer}>{category.strCategory}</div>
    </div>
  );
}

export default CategoryCard;
