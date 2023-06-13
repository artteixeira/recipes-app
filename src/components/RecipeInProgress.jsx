import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientCard from './IngredientCard';

function RecipeInProgress(props) {
  const { match } = props;
  const { params: { id }, path } = match;
  const { recipeDetail, fetchById } = useContext(RecipesContext);
  const type = match.path.includes('drink') ? 'drinks' : 'meals';
  useEffect(() => {
    fetchById(id, type);
  }, []);

  return (
    <div>
      {recipeDetail && recipeDetail.map((element, index) => {
        const ingredients = [];
        const measures = [];
        const magicNumber = 20;
        for (let i = 0; i <= magicNumber; i += 1) {
          const ingredient = element[`strIngredient${i}`];
          const measure = element[`strMeasure${i}`];
          if (ingredient) ingredients.push(ingredient);
          if (measure) measures.push(measure);
        }

        return (
          <div key={ index }>
            <ShareButton />
            <FavoriteButton
              id={ id }
              path={ path }
            />
            <img
              width={ 50 }
              src={ element.strMealThumb || element.strDrinkThumb }
              alt={ element.strMeal || element.strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {element.strMeal || element.strDrink }
            </h1>
            <p data-testid="recipe-category">
              {element.strAlcoholic || element.strCategory}
            </p>
            {ingredients.map((ingredient, indexIngredient) => (
              <div key={ indexIngredient }>
                <IngredientCard
                  ingredient={ ingredient }
                  index={ indexIngredient }
                  type={ type }
                  id={ id }
                  measures={ measures }
                />
              </div>
            ))}
            <p data-testid="instructions">{element.strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
            >
              Finish Recipe
            </button>
          </div>
        );
      })}

    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
