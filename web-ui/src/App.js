import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import Foods from './components/Foods';
import Food from './components/Food';
import Error from './components/Error';
import Navigation from './components/Navigation';

import './less/global.less';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/users" component={Users} exact />
            <Route path="/users/:userId" component={User} />
            <Route path="/foods" component={Foods} exact/>
            <Route path="/foods/:foodId" component={Food} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;