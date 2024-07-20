export const categoriesAPI =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

export const getItemsByCatetgoryAPI = (categoryName) => {
  return ` https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
};
