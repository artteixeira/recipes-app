import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

function RecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const {
    fetchById,
    recipeDetail,
    setSearchBarFilter,
  } = useContext(RecipesContext);
  console.log();
  const type = match.path.includes('drink') ? 'drinks' : 'meals';
  useEffect(() => {
    setSearchBarFilter({
      type: '',
      value: '',
    });
    fetchById(id, type);
  }, []);

  return (
    <div>
      <h1>AAAAAAAAA</h1>
      {recipeDetail && recipeDetail.map((element) => (
        <div key={ element.idMeal || element.idDrink }>
          <h1>{element.strMeal || element.strDrink }</h1>
        </div>
      ))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
