import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
          >
            <img src={ profileIcon } alt="Profile icon" />
          </button>)}
      { header.search
      && (
        <button
          data-testid="search-top-btn"
          onClick={ () => setInputSearch(!inputSearch) }
        >
          <img src={ searchIcon } alt="Search icon" />
        </button>)}
      { inputSearch
        && (<input type="text" />)}
    </div>
  );
}

export default Header;
