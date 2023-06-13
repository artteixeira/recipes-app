import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const history = useHistory();
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

  const [recipeDetail, setRecipeDetail] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [copiedLinkMessage, setCopiedLinkMessage] = useState(false);

  const fetchMealsCategory = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategoryList(data.meals.filter((element, index) => {
      const magicNumber = 5;
      return index < magicNumber && element;
    }));
  };

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

    if (data.meals === null) {
      global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
      return setSearchBarFilter({
        type: '',
        value: '',
      });
    } if (data.meals.length === 1) {
      const id = data.meals[0].idMeal;
      history.push(`/meals/${id}`);
    } else {
      fetchMealsCategory();
      setRecipesList(data.meals.filter((element, index) => {
        const magicNumber = 12;
        return index < magicNumber && element;
      }));
    }
  };

  const fetchDrinksCategory = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategoryList(data.drinks.filter((element, index) => {
      const magicNumber = 5;
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

    if (data.drinks === null) {
      global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
      return setSearchBarFilter({
        type: '',
        value: '',
      });
    } if (data.drinks.length === 1) {
      const id = data.drinks[0].idDrink;
      history.push(`/drinks/${id}`);
    } else {
      fetchDrinksCategory();
      setRecipesList(data.drinks.filter((element, index) => {
        const magicNumber = 12;
        return index < magicNumber && element;
      }));
    }
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

  const fetchById = async (id, type, path) => {
    const url = type === 'drinks' ? 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' : 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const response = await
    fetch(`${url}${id}`);
    const data = await response.json();
    setRecipeDetail(data[type]);
    if (path.includes('in-progress')) {
      const ingredientsList = [];
      const measuresList = [];
      const magicNumber = 20;
      for (let i = 0; i <= magicNumber; i += 1) {
        const ingredient = data[type][0][`strIngredient${i}`];
        const measure = data[type][0][`strMeasure${i}`];
        if (ingredient) ingredientsList.push(ingredient);
        if (measure) measuresList.push(measure);
      }
      const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let newStorage;

      if (oldStorage && oldStorage[type]) {
        const oldTypeData = oldStorage[type];
        const merged = { ...oldTypeData, [id]: [ingredientsList, measuresList] };
        newStorage = { ...oldStorage, [type]: merged };
      } else {
        newStorage = { ...oldStorage, [type]: { [id]: [ingredientsList, measuresList] } };
      }
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(newStorage));
    }
  };

  const fetchByFilter = async (filter, type) => {
    const url = type === 'drinks' ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

    const response = await fetch(`${url}${filter}`);
    const data = await response.json();
    setRecipesList(data[type].filter((element, index) => {
      const magicNumber = 12;
      return index < magicNumber && element;
    }));
  };

  const value = useMemo(
    () => ({
      loginState: { login, setLogin },
      headerState: { header, setHeader },
      recipesList,
      searchBarState: { searchBar, setSearchBar },
      setSearchBarFilter,
      history,
      fetchById,
      recipeDetail,
      categoryList,
      fetchAPI,
      fetchByFilter,
      copiedLinkMessage,
      setCopiedLinkMessage,
    }),
    [
      login,
      header,
      recipesList,
      searchBar,
      setSearchBarFilter,
      fetchById,
      recipeDetail,
      history,
      categoryList,
      fetchAPI,
      copiedLinkMessage,
      setCopiedLinkMessage,
    ],
  );

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
