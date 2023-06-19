import React from 'react';
import '../css/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        className="meal-button"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="Meals icon"
          width={ 30 }
        />
      </button>
      <button
        className="drink-button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="Drinks icon"
          width={ 30 }
        />
      </button>
    </footer>
  );
}

export default Footer;
