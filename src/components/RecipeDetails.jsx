import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import {
  fetchRecomendationMealsAPI, fetchRecomendationDrinksAPI,
} from '../services/fetchRecomendationAPI';

function RecipeDetails(props) {
  const { match } = props;
  const { params, path, url } = match;
  const { id } = params;
  const {
    fetchById,
    recipeDetail,
    setSearchBarFilter,
    history,
  } = useContext(RecipesContext);

  let ingredients = [];
  let measures = [];

  console.log('path', path);
  const type = path.includes('drink') ? 'drinks' : 'meals';
  const [recomendedList, setRecomendedList] = useState([]);
  const recipeStatusStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [recipeStatus] = useState(recipeStatusStorage ? Object
    .keys(recipeStatusStorage[type]).includes(id) : false);
  console.log(recipeStatus);

  const [favoriteRecipe, setFavoriteRecipe] = useState(); // estado utilizado para gerenciar o botão de favoritos

  const [copiedLinkMessage, setCopiedLinkMessage] = useState(false); // estado que gerencia a exibição da mensagem 'Link copied".

  const fetchRecomendation = async (pathname) => {
    const recomendationForMeals = await fetchRecomendationMealsAPI();
    const recomendationForDrinks = await fetchRecomendationDrinksAPI();
    if (pathname.includes('meals')) {
      return setRecomendedList(recomendationForMeals);
    } return setRecomendedList(recomendationForDrinks);
  };

  const setFavoriteList = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let newFavorite = {};
    const strType = path.includes('drink') ? 'drink' : 'meal';
    const {
      idMeal,
      idDrink,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
      strAlcoholic,
      strDrink,
      strDrinkThumb } = recipeDetail[0];

    const favorite = {
      id: idMeal || idDrink,
      type: strType,
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };

    const isFavorite = storage.some((recipe) => recipe.id === id); // verifico se o id do item atual bate com o id de algum dos itens salvos no meu storage;
    if (isFavorite) {
      newFavorite = storage.filter((recipe) => recipe.id !== id);
    } else {
      newFavorite = [...storage, favorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  const verifyFavorites = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage.some((recipe) => recipe.id === id)) setFavoriteRecipe(true);
  };

  useEffect(() => {
    setSearchBarFilter({
      type: '',
      value: '',
    });
    fetchById(id, type, path);
    fetchRecomendation(type);
    verifyFavorites();
  }, []);

  const filterRecomendationCard = (element, index) => {
    const magicNumber = 6;
    return index < magicNumber && element;
  };

  const newUrl = `http://localhost:3000${url}`;

  return (
    <>
      <button
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(newUrl);
          setCopiedLinkMessage(true);
          const magicNumber = 1000;
          setTimeout(() => setCopiedLinkMessage(false), magicNumber);
        } }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>

      <button
        data-testid="favorite-btn"
        src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => {
          setFavoriteRecipe(!favoriteRecipe);
          setFavoriteList();
        } }
      >
        { favoriteRecipe
          ? (<img src={ blackHeartIcon } alt="Black heart icon" />)
          : (<img src={ whiteHeartIcon } alt="White heart icon" />)}
      </button>

      {copiedLinkMessage && (<h1>Link copied!</h1>)}
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
            if (i === magicNumber) {
              ingredients = ingredientsList;
              measures = measuresList;
            }
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
                { ingredients.map((ingredient, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <span>{ingredient}</span>
                    <span>{' - '}</span>
                    <span>{measures[index]}</span>
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
                  allowFullScreen
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="recomended-card">
        {
          recomendedList && recomendedList.filter(filterRecomendationCard)
            .map((element, index) => (
              <div
                className="recipe-card"
                key={ element.idMeal || element.idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="img-recomended-card"
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
      </div>
      <button
        className="start-recipe-button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          history.push(`/${type}/${id}/in-progress`);
        } }
      >
        {
          !recipeStatus ? 'Start Recipe' : 'Continue Recipe'
        }
      </button>
    </>
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
