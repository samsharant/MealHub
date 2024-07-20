export const categoriesURL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

export const getItemsByCatetgoryURL = (categoryName) => {
  return ` https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
};

export const getItemByIdURL = (mealId) => {
  return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
};
