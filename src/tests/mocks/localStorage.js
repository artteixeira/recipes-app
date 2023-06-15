export const localStorageMock = (function () {
  const store = {
    favoriteRecipes: [],
    inProgressRecipes: {
      drinks: {
        2: ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
      },
      meals: {
        8: ['pasta', 'tomato'],
      },
    },
    doneRecipes: [
      {
        id: '52977',
        type: 'comida',
      },
    ],
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = JSON.parse(value);
    },
  };
}());

export const localStorageMock2 = (function () {
  const store = {
    favoriteRecipes: [],
    inProgressRecipes: {
      drinks: {
        2: ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
      },
      meals: {
        1: [
          'penne rigate',
          'olive oil',
          'garlic',
          'chopped tomatoes',
          'red chile flakes',
          'italian seasoning',
          'basil',
          'Parmigiano-Reggiano',
        ],
      },
    },
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = JSON.parse(value);
    },
  };
}());
