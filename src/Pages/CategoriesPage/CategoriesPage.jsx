import { useContext, useEffect } from "react";
import { ShopContext } from "../../Store/Context";
import useFetch from "../../Hooks/useFetch";
import { categoriesURL } from "../../utils";
import styles from "./CategoriesPage.module.css";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import CustomTitleText from "../../Components/CustomTitleText/CustomTitleText";

function CategoriesPage() {
  const { state, dispatch } = useContext(ShopContext);
  const shouldFetch = !state.categories.length;
  const { responseData, loading, error } = useFetch(categoriesURL, shouldFetch);

  useEffect(() => {
    if (responseData) {
      dispatch({
        type: "SET_CATEGORIES",
        payload: responseData.categories.slice(0, 5),
      });
    }
  }, [responseData, dispatch]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <CustomTitleText title={"Loading..."} />;

  return (
    <>
      <h2 className={styles.CategoriesTitle}>Shop by category</h2>

      <div className={styles.CategoriesWrapper}>
        {state.categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>
    </>
  );
}

export default CategoriesPage;
