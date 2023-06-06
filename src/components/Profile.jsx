import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const { headerState } = useContext(RecipesContext);

  useEffect(() => {
    headerState.setHeader({
      title: 'Profile',
      profile: true,
      search: false,
    });
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Profile;
