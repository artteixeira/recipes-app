import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      { pathname === '/meals'
        ? (<Meals />)
        : (<Drinks />)}
    </div>
  );
}

export default Recipes;
