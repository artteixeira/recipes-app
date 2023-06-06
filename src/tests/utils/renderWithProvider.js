import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipesProvider from '../../context/RecipesProvider';

const renderWithRouterAndProvider = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <RecipesProvider>
          {component}
        </RecipesProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterAndProvider;
