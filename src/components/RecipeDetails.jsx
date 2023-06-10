import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

import {
  fetchRecomendationMealsAPI, fetchRecomendationDrinksAPI,
} from '../services/fetchRecomendationAPI';

function RecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const {
    fetchById,
    recipeDetail,
    setSearchBarFilter,
  } = useContext(RecipesContext);

  const [recomendedList, setRecomendedList] = useState([]);

  const type = match.path.includes('drink') ? 'drinks' : 'meals';

  const fetchRecomendation = async (xablau) => {
    const recomendationForMeals = await fetchRecomendationMealsAPI();
    const recomendationForDrinks = await fetchRecomendationDrinksAPI();
    if (xablau.includes('meals')) {
      return setRecomendedList(recomendationForMeals);
    } return setRecomendedList(recomendationForDrinks);
  };

  useEffect(() => {
    setSearchBarFilter({
      type: '',
      value: '',
    });
    fetchById(id, type);
    fetchRecomendation(type);
  }, []);

  const filterRecomendationCard = (element, index) => {
    const magicNumber = 6;
    return index < magicNumber && element;
  };

  return (
    <>
      <div>
        {recipeDetail && recipeDetail.map((element) => {
          const ingredientsList = [];
          const measuresList = [];
          const magicNumber = 20;
          for (let i = 0; i <= magicNumber; i += 1) {
            const ingredient = element[`strIngredient${i}`];
            const measure = element[`strMeasure${i}`];
            if (ingredient) ingredientsList.push(ingredient);
            if (measure) measuresList.push(measure);
          }
          return (
            <div key={ element.idMeal || element.idDrink }>
              <h1 data-testid="recipe-title">
                {element.strMeal || element.strDrink }
              </h1>
              <img
                width="200"
                data-testid="recipe-photo"
                src={ element.strMealThumb || element.strDrinkThumb }
                alt={ element.strMeal || element.strDrink }
              />
              <p data-testid="recipe-category">
                {element.strAlcoholic || element.strCategory}
              </p>
              <div>
                <p>Ingredients</p>
                { ingredientsList.map((ingredient, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <span>{ingredient}</span>
                    <span>{' - '}</span>
                    <span>{measuresList[index]}</span>
                  </div>
                ))}

              </div>
              <p data-testid="instructions">{element.strInstructions}</p>
              { element.strYoutube && (

                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ element.strYoutube.replace('watch?v=', 'embed/') }
                  title="YouTube video player"
                  allow="accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share"
                  allowfullscreen
                />
              )}
            </div>
          );
        })}
      </div>
      {
        recomendedList && recomendedList.filter(filterRecomendationCard)
          .map((element, index) => (
            <div
              className="recipe-card"
              key={ element.idMeal || element.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="img-card"
                src={ element.strMealThumb || element.strDrinkThumb }
                alt={ element.strMeal || element.strDrink }
              />
              <h1
                data-testid={ `${index}-recommendation-title` }
              >
                {element.strMeal || element.strDrink }
              </h1>
            </div>
          ))
      }
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
