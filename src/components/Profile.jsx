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
      <main className="profile-container">
        <div className="btn-container">
          <h1
            className="profile-email"
            data-testid="profile-email"
          >
            {email}
          </h1>
          <button
            data-testid="profile-done-btn"
            className="profile-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>

          <button
            data-testid="profile-favorite-btn"
            className="profile-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>

          <button
            data-testid="profile-logout-btn"
            className="profile-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
