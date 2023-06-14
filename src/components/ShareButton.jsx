import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';

function ShareButton({ horizontal, index, type, id }) {
  const { copiedLinkMessage, setCopiedLinkMessage } = useContext(RecipesContext);
  const url = `http://localhost:3000/${type}/${id}`;
  const test = horizontal ? `${index}-horizontal-share-btn` : 'share-btn';
  return (
    <div>
      <button
        data-testid={ test }
        src={ shareIcon }
        onClick={ () => {
          clipboardCopy(url);
          setCopiedLinkMessage(true);
          const magicNumber = 1000;
          setTimeout(() => setCopiedLinkMessage(false), magicNumber);
        } }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      {copiedLinkMessage && (<h1>Link copied!</h1>)}
    </div>
  );
}

ShareButton.propTypes = {
  horizontal: PropTypes.bool,
  index: PropTypes.number,
}.isRequired;

export default ShareButton;
