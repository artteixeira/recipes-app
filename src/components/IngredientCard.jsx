import { useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientCard({ ingredient, index, type, id, measures }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [checked, setChecked] = useState(false);

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      style={ { textDecoration: checked ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
    >
      <input
        type="checkbox"
        name="recipe"
        id="recipe"
        onChange={ () => {
          setChecked(!checked);
        } }
      />
      <span>
        <span>{ingredient}</span>
        <span>{' - '}</span>
        <span>{measures[index]}</span>
      </span>
    </label>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.number,
  type: PropTypes.string,
  id: PropTypes.string,
  measures: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
