import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipesContext from '../context/RecipesContext';
import '../css/Profile.css';

function Profile() {
  const { headerState } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    headerState.setHeader({
      title: 'Profile',
      profile: true,
      search: false,
    });
  }, []);

  const email = JSON.parse(localStorage.getItem('user'))?.email;

  return (
    <div>
      <Header />
      <main>
        <h1
          data-testid="profile-email"
        >
          {email}
        </h1>
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
