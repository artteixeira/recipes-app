import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Profile from './components/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route
            path="/meals/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            path="/drinks/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            path="/meals/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
          <Route
            path="/drinks/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </div>
  );
}

export default App;
