import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import '@brainhubeu/react-carousel/lib/style.css';

import { Header } from './components';
import { Breed, Home, Team } from './pages';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/breed/:breed">
              <Breed />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
