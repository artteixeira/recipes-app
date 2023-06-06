import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { headerState } = useContext(RecipesContext);
  const { header } = headerState;
  const [inputSearch, setInputSearch] = useState(false);

  const history = useHistory();

  return (
    <div>
      <h1 data-testid="page-title">{ header.title }</h1>
      { header.profile
        && (
          <button
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
            src={ profileIcon }
          >
            <img src={ profileIcon } alt="Profile icon" />
          </button>)}
      { header.search
      && (
        <button
          data-testid="search-top-btn"
          onClick={ () => setInputSearch(!inputSearch) }
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="Search icon" />
        </button>)}
      { inputSearch
        && (<SearchBar />)}
    </div>
  );
}

export default Header;
