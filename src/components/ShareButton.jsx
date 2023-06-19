import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

function ShareButton({ horizontal, index, type, id }) {
  const [copiedLinkMessage, setCopiedLinkMessage] = useState(false);
  const url = `http://localhost:3000/${type}/${id}`;
  const test = horizontal ? `${index}-horizontal-share-btn` : 'share-btn';
  return (
    <div>
      <button
        className="fav-button"
        data-testid={ test }
        src={ shareIcon }
        onClick={ () => {
          clipboardCopy(url);
          setCopiedLinkMessage(true);
          const magicNumber = 1000;
          setTimeout(() => setCopiedLinkMessage(false), magicNumber);
        } }
      >
        <img className="fav-icon" src={ shareIcon } alt="Share icon" width={ 20 } />
      </button>
      {copiedLinkMessage && (<p>Link copied!</p>)}
    </div>
  );
}

ShareButton.propTypes = {
  horizontal: PropTypes.bool,
  index: PropTypes.number,
}.isRequired;

export default ShareButton;
