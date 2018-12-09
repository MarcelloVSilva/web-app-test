import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { Translate, withLocalize } from 'react-localize-redux';
import GlobalTranslations from './res/translations/global.json'
import bdbr from './res/bandeiras/bd-br.png'
import bdusa from './res/bandeiras/bd-usa.png'
import LogoReact from './res/logo/logoReact.svg'

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
                  <img src={LogoReact} className='App-logo' ></img>
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
                      <img alt='flag' className="bandeiras bandeiraBrasil" src={bdbr} />
                    </div>
                    <div onClick={() => translate.setActiveLanguage('en')}>
                      <img alt='flag' className="bandeiras bandeiraUSA" src={bdusa} />
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
