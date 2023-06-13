import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';

import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { copiedLinkMessage, setCopiedLinkMessage, history } = useContext(RecipesContext);

  const { location: { pathname } } = history;

  const url = `http://localhost:3000${pathname}`;

  return (
    <div>
      <button
        data-testid="share-btn"
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

export default ShareButton;
