import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWithRouter = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <Router history={ history }>
        {component}
      </Router>
      ,
    ),
    history,
  });
};

export default renderWithRouter;
