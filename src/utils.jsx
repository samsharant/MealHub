export const categoriesURL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

export const getItemsByCatetgoryURL = (categoryName) => {
  return ` https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
};

export const getItemByIdURL = (mealId) => {
  return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
};

export const getRandomPrice = () => {
  const min = 200;
  const max = 500;
  // Generate a random number between min (inclusive) and max (inclusive)
  const price = Math.floor(Math.random() * (max - min + 1)) + min;
  return price;
};

export const getMealDescription = (mealName) => {
  return `Enjoy our delicious ${mealName}, made with the freshest ingredients. Perfect for any time of the day, this dish offers a delightful blend of flavors that will leave you craving more. Available in both vegetarian and non-vegetarian options, it's a wholesome choice for everyone.`;
};

export const generateOrderNumber = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderNumber = "";
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }
  return orderNumber.toUpperCase();
};
