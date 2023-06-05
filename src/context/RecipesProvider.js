import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [header, setHeader] = useState({
    title: '',
    profile: true,
    search: true,
  });

  const value = useMemo(
    () => ({
      loginState: { login, setLogin }, headerState: { header, setHeader } }),
    [login, header],
  );

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
