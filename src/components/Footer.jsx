import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Drinks icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ () => history.push('/meals') }
      >
        <img src={ mealIcon } alt="Meals icon" />
      </button>
    </footer>
  );
}

export default Footer;
