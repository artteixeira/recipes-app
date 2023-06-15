const localStorageMock = (function () {
  const store = {
    favoriteRecipes: [],
    inProgressRecipes: {
      drinks: {
        2: ['lemon', 'ice'],
      },
      meals: {},
    },
    doneRecipes: [],
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },
  };
}());

export default localStorageMock;
