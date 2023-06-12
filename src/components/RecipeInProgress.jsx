import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function RecipeInProgress(props) {
  const { match } = props;
  const { params: { id }, path } = match;

  const { recipeDetail } = useContext(RecipesContext);

  const {
    strCategory,
    strMeal,
    strMealThumb,
    strAlcoholic,
    strDrink,
    strDrinkThumb,
    strInstructions,
  } = recipeDetail[0];

  console.log(recipeDetail);

  const xd = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(xd);
  return (
    <div>
      <ShareButton />
      <FavoriteButton
        id={ id }
        path={ path }
      />
      <img
        width={ 50 }
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {strMeal || strDrink }
      </h1>
      <p data-testid="recipe-category">
        {strAlcoholic || strCategory}
      </p>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
