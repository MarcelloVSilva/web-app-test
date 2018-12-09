import React, { Component } from 'react'
import { withLocalize, Translate } from 'react-localize-redux';
import HomeTranslations from '../../res/translations/home.json'
class Home extends Component {
    constructor(props) {
        super(props)
        props.addTranslation(HomeTranslations)
    }


    render() {
        return (
            <Translate>
                {({ translate }) => {
                    return (
                        <div id='home'>
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
