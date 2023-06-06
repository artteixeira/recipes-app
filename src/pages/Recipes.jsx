import React from 'react';
import { useHistory } from 'react-router-dom';
// import Header from '../components/Header';
// import RecipesContext from '../context/RecipesContext';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  // const { headerState } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  // useEffect(() => {
  //   headerState.setHeader({
  //     title: pathname === '/meals' ? 'Meals' : 'Drinks',
  //     profile: true,
  //     search: true,
  //   });
  // }, []);
  return (
    <div>
      { pathname === '/meals'
        ? (<Meals />)
        : (<Drinks />)}
    </div>
  );
}

export default Recipes;
