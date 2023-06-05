import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { headerState } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  useEffect(() => {
    headerState.setHeader({
      title: pathname === '/meals' ? 'Meals' : 'Drinks',
      profile: true,
      search: true,
    });
  }, []);
  return (
    <Header />
  );
}

export default Recipes;
