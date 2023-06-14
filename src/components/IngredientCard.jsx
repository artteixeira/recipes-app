import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function IngredientCard(
  { ingredient, index, type, id, measures, verifyButton, list },
) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storageKey = 'inProgressRecipes';
    const oldStorage = JSON.parse(localStorage.getItem(storageKey));

    if (oldStorage && oldStorage[type]
      && oldStorage[type][id] && oldStorage[type][id].includes(ingredient)) {
      setChecked(true);
    }
  }, [type, id, ingredient]);

  const handleCheckbox = () => {
    setChecked(!checked);
    const storageKey = 'inProgressRecipes';
    const oldStorage = localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : { drinks: {}, meals: {} };
    if (checked) {
      if (oldStorage && oldStorage[type][id]) {
        oldStorage[type][id] = oldStorage[type][id].filter((ing) => ing !== ingredient);
      }
    } else if (oldStorage[type][id]) {
      oldStorage[type][id].push(ingredient);
    } else {
      oldStorage[type][id] = [ingredient];
    }

    localStorage.setItem(storageKey, JSON.stringify(oldStorage));
    verifyButton(list);
  };

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      style={ { textDecoration: checked ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
    >
      <input
        type="checkbox"
        name="recipe"
        id="recipe"
        onChange={ handleCheckbox }
        checked={ checked }
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
