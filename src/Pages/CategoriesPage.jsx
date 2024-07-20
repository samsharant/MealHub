import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { categoriesAPI } from "../utils";

function CategoriesPage() {
  const { responseData, loading, error } = useFetch(categoriesAPI);

  if (error) return <p>Error: {error.message}</p>;

  return loading ? (
    <p>Loading...</p>
  ) : (
    responseData.categories?.map((category) => (
      <Link to={`/items/${category.strCategory}`}>
        <div>
          <h5>{category.strCategory}</h5>
          <img src={category.strCategoryThumb} />
        </div>
      </Link>
    ))
  );
}

export default CategoriesPage;
