import React, { useContext, useState } from 'react';
import '../css/Header.css';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { headerState, history } = useContext(RecipesContext);
  const { header } = headerState;
  const [inputSearch, setInputSearch] = useState(false);

  return (
    <header>
      <section className="header-container">
        {
          header.search
        && (
          <button
            className="search-button"
            data-testid="search-top-btn"
            onClick={ () => setInputSearch(!inputSearch) }
            src={ searchIcon }
          >
            <img
              src={ searchIcon }
              alt="Search icon"
              width={ 20 }
            />
          </button>)
        }
        <span
          className="header-title"
          data-testid="page-title"
        >
          { header.title }
        </span>
        { header.profile
          && (
            <button
              className="profile-button"
              data-testid="profile-top-btn"
              onClick={ () => history.push('/profile') }
              src={ profileIcon }
            >
              <img
                className="profile-icon"
                src={ profileIcon }
                alt="Profile icon"
                width={ 20 }
              />
            </button>)}
      </section>
      <div>
        { inputSearch
        && (
          <SearchBar />
        )}
      </div>
    </header>
  );
}

export default Header;
