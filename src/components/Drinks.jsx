import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

function Drinks() {
  const typeForRecipeList = 'Drink';
  const typeForFilter = 'drinks';
  const { headerState,
    recipesList,
    categoryList,
    fetchAPI,
    fetchByFilter,
    history } = useContext(RecipesContext);

  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    headerState.setHeader({
      title: 'Drinks',
      profile: true,
      search: true,
    });
  }, []);

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => { fetchAPI(); } }
        >
          All
        </button>
        {categoryList && categoryList.map((element, index) => (
          <button
            data-testid={ `${element.strCategory}-category-filter` }
            key={ index }
            onClick={ () => {
              if (filterState !== element.strCategory) {
                setFilterState(element.strCategory);
                return fetchByFilter(element.strCategory, typeForFilter);
              }
              setFilterState('');
              fetchAPI();
            } }
          >
            {element.strCategory}
          </button>
        ))}
      </div>
      {recipesList && recipesList.map((element, index) => {
        const values = {
          index,
          name: element[`str${typeForRecipeList}`],
          img: element[`str${typeForRecipeList}Thumb`],
        };
        const id = element[`id${typeForRecipeList}`];

        return (
          <button
            key={ index }
            className="recipe-container"
            onClick={ () => {
              history.push(`/${typeForFilter}/${id}`);
            } }
          >

            <RecipeCard values={ values } />

          </button>
        );
      })}
      <Footer />
    </div>
  );
}

export default Drinks;
