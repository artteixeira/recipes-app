import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { headerState } = useContext(RecipesContext);

  useEffect(() => {
    headerState.setHeader({
      title: 'Favorite Recipes',
      profile: true,
      search: false,
    });
  }, []);

  return (
    <Header />
  );
}

export default FavoriteRecipes;
