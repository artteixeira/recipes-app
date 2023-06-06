import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [header, setHeader] = useState({
    title: '',
    profile: true,
    search: true,
  });
  const [searchBar, setSearchBar] = useState({
    type: '',
    value: '',
  });

  const [searchBarFilter, setSearchBarFilter] = useState({
    type: '',
    value: '',
  });

  const [recipesList, setRecipesList] = useState('');

  const value = useMemo(
    () => ({
      loginState: { login, setLogin },
      headerState: { header, setHeader },
      recipesList,
      searchBarState: { searchBar, setSearchBar },
      setSearchBarFilter }),
    [login, header, recipesList, searchBar, setSearchBarFilter],
  );

  const fetchMeals = async () => {
    const defaultFetch = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    let customUrl = null;
    switch (searchBarFilter.type) {
    case 'name':
      customUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarFilter.value}`;
      break;
    case 'firstLetter':
      customUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarFilter.value}`;
      break;
    case 'ingredient':
      customUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBarFilter.value}`;
      break;
    default:
      break;
    }
    const response = await fetch(customUrl || defaultFetch);
    const data = await response.json();
    setRecipesList(data.meals.filter((element, index) => {
      const magicNumber = 12;
      return index < magicNumber && element;
    }));
  };

  const fetchDrinks = async () => {
    const defaultFetch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    let customUrl = null;
    switch (searchBarFilter.type) {
    case 'name':
      customUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBarFilter.value}`;
      break;
    case 'firstLetter':
      customUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBarFilter.value}`;
      break;
    case 'ingredient':
      customUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarFilter.value}`;
      break;
    default:
      break;
    }
    const response = await fetch(customUrl || defaultFetch);
    const data = await response.json();
    setRecipesList(data.drinks.filter((element, index) => {
      const magicNumber = 12;
      return index < magicNumber && element;
    }));
  };
  const fetchAPI = () => {
    if (header.title === 'Meals') {
      fetchMeals();
    } else {
      fetchDrinks();
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [searchBarFilter, header.title]);

  return (
    <RecipesContext.Provider
      value={ value }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = ({
  children: PropTypes.node.isRequired,
});
