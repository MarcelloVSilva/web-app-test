import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';
import HomeTranslations from './translations/translations.json'
class Home extends Component {
    constructor(props) {
        super(props)
        props.addTranslation(HomeTranslations)
    }


    render() {
        return (
            <Translate>
                {({translate}) => {
                    return (
                        <div id='home'>
                            <div id='header'>
                                <div id='logo'>LOGO</div>
                                <div id='navigation'>
                                    <Link to='/contact'>
                                        <div>Contact</div>
                                    </Link>
                                </div>
                            </div>
                            <div id='title'>{translate('title')}</div>
                            <div id='subtitle'>{translate('subtitle')}</div>
                        </div>
                    )
                }
                }
            </Translate>
        )
    }
}

export default withLocalize(Home)
