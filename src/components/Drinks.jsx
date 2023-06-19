import React, { useContext, useEffect, useState } from 'react';
import '../css/Recipes.css';
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
    history,
    setSearchBarFilter } = useContext(RecipesContext);

  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    headerState.setHeader({
      title: 'Drinks',
      profile: true,
      search: true,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="recipes-container">
        <section className="filter-btns-section">
          <button
            data-testid="All-category-filter"
            onClick={ () => {
              setSearchBarFilter({
                type: '',
                value: '',
              });
              fetchAPI();
            } }
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
        </section>
        <section className="recipes-list-section">
          {recipesList && recipesList.map((element, index) => {
            const values = {
              index,
              name: element[`str${typeForRecipeList}`],
              img: element[`str${typeForRecipeList}Thumb`],
            };
            const id = element[`id${typeForRecipeList}`];
            return (
              <button
                className="recipe-button-card"
                key={ index }
                onClick={ () => {
                  history.push(`/${typeForFilter}/${id}`);
                } }
              >
                <RecipeCard values={ values } />

              </button>
            );
          })}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Drinks;
