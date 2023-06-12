import React from 'react';

function RecipeInProgress() {
  const xd = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(typeof xd);
  return (
    <h1>Progresso</h1>
  );
}

export default RecipeInProgress;
