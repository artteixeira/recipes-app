import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { headerState } = useContext(RecipesContext);

  useEffect(() => {
    headerState.setHeader({
      title: 'Done Recipes',
      profile: true,
      search: false,
    });
  }, []);
  return (
    <Header />
  );
}

export default Recipes;
