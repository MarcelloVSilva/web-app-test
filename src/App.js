import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { withLocalize, Translate } from 'react-localize-redux';

class App extends Component {
  constructor(props) {
    super(props)
    props.initialize({
      languages: [
        { name: 'Português', code: 'pt' },
        { name: 'Inglês', code: 'en' }
      ],
      options: { renderToStaticMarkup }
    });
  }
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

export default withLocalize(App);
