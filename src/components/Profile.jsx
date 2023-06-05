import React, { useContext, useEffect } from 'react';
import Header from './Header';
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
    <Header />
  );
}

export default Profile;
