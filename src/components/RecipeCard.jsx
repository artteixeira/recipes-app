import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard(props) {
  const { values } = props;
  const { name, index, img } = values;
  return (
    <div
      className="recipe-cards"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="recipe-img-card"
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
      />
      <p
        className="recipe-name-card"
        data-testid={ `${index}-card-name` }
      >
        {name}
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    index: PropTypes.number,
    img: PropTypes.string,
  }).isRequired,
};
