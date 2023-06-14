import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientCard from './IngredientCard';

function RecipeInProgress(props) {
  const { match } = props;
  const { params: { id }, path, url } = match;
  const { recipeDetail, fetchById, history } = useContext(RecipesContext);
  const type = match.path.includes('drink') ? 'drinks' : 'meals';

  const ingredients = [];
  const measures = [];
  const magicNumber = 20;

  const [disableButton, setDisableButton] = useState(false);

  const verifyDisableButton = (list) => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[type] && storage[type][id]) {
      return setDisableButton(storage[type][id].length === list.length);
    }
    return setDisableButton(false);
  };

  useEffect(() => {
    fetchById(id, type, url);
  }, []);

  useEffect(() => {
    verifyDisableButton(ingredients);
  }, [ingredients]);

  return (
    <div>
      {recipeDetail && recipeDetail.map((element, index) => {
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
                  list={ ingredients }
                  verifyButton={ verifyDisableButton }
                />
              </div>
            ))}
            <p data-testid="instructions">{element.strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
              disabled={ !disableButton }
              onClick={ () => {
                const storage = localStorage.getItem('doneRecipes')
                  ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

                const newItem = {
                  id: element.idMeal || element.idDrink,
                  nationality: element.strArea || '',
                  name: element.strMeal || element.strDrink,
                  category: element.strCategory || '',
                  image: element.strMealThumb || element.strDrinkThumb,
                  tags: element.strTags ? element.strTags.split(',') : [],
                  alcoholicOrNot: element.strAlcoholic || '',
                  type: type.replace('s', ''),
                  doneDate: new Date(),
                };

                const filteredStorage = storage.filter((item) => item.id !== newItem.id);

                localStorage.setItem(
                  'doneRecipes',
                  JSON.stringify([...filteredStorage, newItem]),
                );
                history.push('/done-recipes');
              } }
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
