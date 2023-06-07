import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

function Meals() {
  const type = 'Meal';
  const { headerState, recipesList } = useContext(RecipesContext);
  useEffect(() => {
    headerState.setHeader({
      title: 'Meals',
      profile: true,
      search: true,
    });
  }, []);

  return (
    <div>
      <Header />
      {recipesList && recipesList.map((element, index) => {
        const values = {
          index,
          name: element[`str${type}`],
          img: element[`str${type}Thumb`],
        };

        return (
          <div
            className="recipe-container"
            key={ index }
          >
            <RecipeCard values={ values } />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default Meals;
