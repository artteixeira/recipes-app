const urlMeals = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlDrinks = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const fetchRecomendationMealsAPI = async () => {
  const response = await fetch(urlMeals);
  const data = await response.json();
  return data.drinks;
};

export const fetchRecomendationDrinksAPI = async () => {
  const response = await fetch(urlDrinks);
  const data = await response.json();
  return data.meals;
};
