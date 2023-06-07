import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const {
    searchBarState: { searchBar, setSearchBar },
    setSearchBarFilter,
  } = useContext(RecipesContext);
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => {
          setSearchBar({
            ...searchBar,
            value: target.value,
          });

          if (searchBar
            .type === 'firstLetter'
            && target
              .value
              .length > 1) { alert('Your search must have only 1 (one) character'); }
        } }
      />
      <label
        htmlFor="ingredient"
      >
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="searchRadio"
          onChange={ ({ target }) => {
            setSearchBar({
              ...searchBar,
              type: target.id,
            });
          } }
        />
        Ingredient
      </label>
      <label
        htmlFor="name"
      >
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="searchRadio"
          onChange={ ({ target }) => {
            setSearchBar({
              ...searchBar,
              type: target.id,
            });
          } }
        />
        Name
      </label>
      <label
        htmlFor="firstLetter"
      >
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="searchRadio"
          onChange={ ({ target }) => {
            setSearchBar({
              ...searchBar,
              type: target.id,
            });
          } }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ async () => {
          setSearchBarFilter(searchBar);
        } }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
