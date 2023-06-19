import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ id, path }) {
  const { recipeDetail } = useContext(RecipesContext);

  const [favoriteRecipe, setFavoriteRecipe] = useState();

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
    verifyFavorites();
  }, []);

  return (
    <button
      className="fav-button"
      data-testid="favorite-btn"
      src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
      onClick={ () => {
        setFavoriteRecipe(!favoriteRecipe);
        setFavoriteList();
      } }
    >
      { favoriteRecipe
        ? (<img src={ blackHeartIcon } alt="Black heart icon" width={ 20 } />)
        : (<img src={ whiteHeartIcon } alt="White heart icon" width={ 20 } />)}
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FavoriteButton;
