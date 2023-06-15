import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import ShareButton from './ShareButton';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { headerState, history } = useContext(RecipesContext);
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    headerState.setHeader({
      title: 'Done Recipes',
      profile: true,
      search: false,
    });
  }, []);

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

  return (
    <div>
      <Header />
      {['All', 'Food', 'Drink'].map((element, index) => {
        const newElement = element === 'Food' ? 'meal' : element;
        return (
          <button
            data-testid={ `filter-by-${newElement.toLowerCase()}-btn` }
            key={ index }
            value={ element }
            onClick={ ({ target }) => {
              const value = target.value === 'Food' ? 'meal' : target.value.toLowerCase();
              setTypeFilter(value);
            } }
          >
            {element}
          </button>
        );
      })}
      { storage && storage.filter(filterStorage).map((element, index) => (
        <div key={ index }>
          <button
            onClick={ () => {
              history.push(`/${element.type}s/${element.id}`);
            } }
          >
            <img
              width={ 100 }
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt={ element.name }
            />

            <p data-testid={ `${index}-horizontal-top-text` }>
              {element.alcoholicOrNot
              || (`${element.nationality} - ${element.category}`)}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>

            {element.tags && element.tags.map((tag, indexTag) => {
              if (indexTag > 2) return;
              return (
                <p
                  key={ indexTag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              );
            })}
          </button>
          <ShareButton
            horizontal
            index={ index }
            type={ `${element.type}s` }
            id={ element.id }
          />
          ;
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
