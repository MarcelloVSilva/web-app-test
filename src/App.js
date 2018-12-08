import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            {Routes().map(function (r, index) {
              return <Route
                key={index}
                path={r.path}
                exact={r.exact}
                component={r.component} />
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
