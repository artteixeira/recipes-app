import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { headerState } = useContext(RecipesContext);
  useEffect(() => {
    headerState.setHeader({
      title: 'Drinks',
      profile: true,
      search: true,
    });
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Drinks;
