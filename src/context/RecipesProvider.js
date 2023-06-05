// import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider
      value=""
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = ({
  children: PropTypes.node.isRequired,
});
