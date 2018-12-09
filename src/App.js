import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { Translate, withLocalize } from 'react-localize-redux';
import GlobalTranslations from './res/translations/global.json'
import LogoReact from './res/imagens/logoReact.svg'

class App extends Component {
  constructor(props) {
    super(props)
    props.addTranslation(GlobalTranslations)
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

      <Translate>
        {(translate) => {
          return (
            <div className="App">
              <div className='App-header'>
                <div id='navigation'>
                  <Link to='/'>
                    <img alt='Logo React' src={LogoReact} className='App-logo' ></img>
                  </Link>
                  <Link to='/'>
                    <div id='homeSection'>{translate.translate('home')}</div>
                  </Link>
                  <Link to='/contact'>
                    <div id='contactSection'>{translate.translate('contact')}</div>
                  </Link>
                </div>
                <div id='changeLanguage'>
                  <i id='globo' className="fas fa-globe-americas"></i>
                  <div id='languagePick'>
                    <div onClick={() => translate.setActiveLanguage('pt')}>
                      pt
                    </div>
                    <div onClick={() => translate.setActiveLanguage('en')}>
                      en
                    </div>
                  </div>
                </div>
              </div>
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
          )
        }
        }
      </Translate>

    );
  }
}

export default withLocalize(App);
