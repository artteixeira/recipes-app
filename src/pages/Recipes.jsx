import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const { history: { location: { pathname } } } = useContext(RecipesContext);
  return (
    <div>
      { pathname.includes('/meals')
        ? (<Meals />)
        : (<Drinks />)}
    </div>
  );
}

export default Recipes;
