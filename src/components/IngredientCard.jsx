import { useState } from 'react';

export default function IngredientCard({ ingredient, index, type, id, measures }) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const verifyChecked = new Array(storage[type][id][0].length).fill(false);
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
          setChecked(true);
          verifyChecked[index] = checked;
          if (storage && storage[type] && storage[type][id]) {
            return;
          }

          const newStorage = {
            ...storage,
            [type]: {
              ...storage[type],
              [id]: [
                ...(storage[type]?.[id] || []),
                verifyChecked,
              ],
            },
          };

          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
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
