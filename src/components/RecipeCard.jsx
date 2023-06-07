import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard(props) {
  const { values } = props;
  const { name, index, img } = values;
  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <p
        data-testid={ `${index}-card-name` }
      >
        {name}
      </p>
      <img
        data-testid={ `${index}-card-img` }
        className="img-card"
        src={ img }
        alt={ name }
      />
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
