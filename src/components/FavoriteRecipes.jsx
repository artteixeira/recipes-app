import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import ShareButton from './ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { headerState, history } = useContext(RecipesContext);
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    headerState.setHeader({
      title: 'Favorite Recipes',
      profile: true,
      search: false,
    });
  }, []);

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  const [typeFilter, setTypeFilter] = useState('all');

  const filterStorage = (element) => {
    const filtered = [];
    switch (typeFilter) {
    case 'meal':
      filtered.push(element.type === 'meal');
      break;
    case 'drink':
      filtered.push(element.type === 'drink');
      break;
    default:
      break;
    }

    return filtered.every((el) => el);
  };
  const newStorage = storage;
  return (
    <div>
      <Header />
      <div className="container">
        <section className="filter-btn-section">
          {['All', 'Food', 'Drink'].map((element, index) => {
            const newElement = element === 'Food' ? 'meal' : element;
            return (
              <button
                data-testid={ `filter-by-${newElement.toLowerCase()}-btn` }
                key={ index }
                value={ element }
                onClick={ ({ target }) => {
                  const value = target
                    .value === 'Food' ? 'meal' : target.value.toLowerCase();
                  setTypeFilter(value);
                } }
              >
                {element}
              </button>
            );
          })}

        </section>
        <div className="recipes-list-section">
          { newStorage && newStorage.filter(filterStorage).map((element, index) => (
            <div key={ index }>
              <button
                onClick={ () => {
                  history.push(`/${element.type}s/${element.id}`);
                } }
              >
                <div className="recipe-photo">
                  <img
                    width={ 100 }
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                  />
                </div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {element.alcoholicOrNot
              || (`${element.nationality} - ${element.category}`)}
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>

                {element.tags && element.tags.slice(0, 2).map((tag, indexTag) => (
                  <p
                    key={ indexTag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </button>

              <section className="icon-buttons">
                <ShareButton
                  horizontal
                  index={ index }
                  type={ `${element.type}s` }
                  id={ element.id }
                />
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => {
                    storage.splice(index, 1);
                    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
                    setRefresh(true);
                  } }
                >
                  <img src={ blackHeartIcon } alt="Black heart icon" />
                </button>
              </section>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
