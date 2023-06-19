import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../css/RecipeDetails.css';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import RecipesContext from '../context/RecipesContext';

import {
  fetchRecomendationMealsAPI,
  fetchRecomendationDrinksAPI,
} from '../services/fetchRecomendationAPI';

const magic = 6;

function RecipeDetails(props) {
  const { match } = props;
  const { params, path } = match;
  const { id } = params;
  const { fetchById,
    recipeDetail, setSearchBarFilter, history } = useContext(RecipesContext);

  const type = path.includes('drink') ? 'drinks' : 'meals';
  const [recomendedList, setRecomendedList] = useState([]);
  const recipeStatusStorage = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const [recipeStatus] = useState(
    recipeStatusStorage && recipeStatusStorage[type]
      ? Object.keys(recipeStatusStorage[type]).includes(id)
      : false,
  );

  const fetchRecomendation = async (pathname) => {
    const recomendationForMeals = await fetchRecomendationMealsAPI();
    const recomendationForDrinks = await fetchRecomendationDrinksAPI();
    if (pathname.includes('meals')) {
      return setRecomendedList(recomendationForMeals);
    }
    return setRecomendedList(recomendationForDrinks);
  };

  useEffect(() => {
    setSearchBarFilter({
      type: '',
      value: '',
    });
    fetchById(id, type);
    fetchRecomendation(type);
  }, []);

  return (
    <div>
      {recipeDetail
        && recipeDetail.map((element) => {
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
            <section
              key={ element.idMeal || element.idDrink }
              className="recipe-detail-container"
            >
              <div className="recipe-photo">
                <img
                  data-testid="recipe-photo"
                  src={ element.strMealThumb || element.strDrinkThumb }
                  alt={ element.strMeal || element.strDrink }
                />
                <div className="fav-share-div">
                  <FavoriteButton id={ id } path={ path } />
                  <ShareButton type={ type } id={ id } />
                </div>
              </div>
              <div className="recipe-title-category">
                <h1 data-testid="recipe-title">
                  {element.strMeal || element.strDrink}
                </h1>
                <p data-testid="recipe-category">
                  {element.strAlcoholic || element.strCategory}
                </p>
                <h5>Ingredients</h5>
              </div>
              <div className="recipe-ingredients">
                {ingredientsList.map((ingredient, index) => (
                  <ul
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <li>{`${ingredient} - ${measuresList[index]}`}</li>
                  </ul>
                ))}
                <p data-testid="instructions">{element.strInstructions}</p>
              </div>
              {element.strYoutube && (
                <iframe
                  data-testid="video"
                  width="360"
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
                  allowFullScreen
                />
              )}
            </section>
          );
        })}
      <section className="recomended-card-section">
        {recomendedList?.slice(0, magic).map((element, index) => (
          <div
            className="recomended-cards"
            key={ element.idMeal || element.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              className="img-recomended-card"
              src={ element.strMealThumb || element.strDrinkThumb }
              alt={ element.strMeal || element.strDrink }
            />
            <h3
              className="name-recomended-card"
              data-testid={ `${index}-recommendation-title` }
            >
              {element.strMeal || element.strDrink}
            </h3>
          </div>
        ))}
        <button
          className="start-recipe-button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            history.push(`/${type}/${id}/in-progress`);
          } }
        >
          {!recipeStatus ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      </section>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
