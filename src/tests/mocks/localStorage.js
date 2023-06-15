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
    favoriteRecipes: [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image:
          'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image:
          'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ],
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
