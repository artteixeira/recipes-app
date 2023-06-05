import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const value = useMemo(() => ({ loginState: { login, setLogin } }), [login]);

  return (
    <RecipesContext.Provider
      value={ value }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = ({
  children: PropTypes.node.isRequired,
});
