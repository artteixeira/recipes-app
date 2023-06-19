import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const { history: { location: { pathname } } } = useContext(RecipesContext);
  return (
    <main>
      { pathname.includes('/meals')
        ? (<Meals />)
        : (<Drinks />)}
    </main>
  );
}

export default Recipes;
