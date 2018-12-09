import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { withLocalize, Translate } from 'react-localize-redux';
import ContactTranslations from '../../res/translations/contact.json'
import { setPaginaAtiva } from '../../res/funcs/setPaginaAtiva.js';

class Contact extends Component {
    constructor(props) {
        super(props)
        props.addTranslation(ContactTranslations)
        this.state = {
            contactForm: {}
        }
    }

    componentDidMount = () => {
        setPaginaAtiva()
    }

    handleChange = name => event => {
        const contactForm = this.state.contactForm
        contactForm[name] = event.target.value
        this.setState({
            contactForm
        });
    }

    render() {
        const { contactForm } = this.state
        return (
            <Translate>
                {({ translate }) => {
                    return (
                        <div id='contactForm'>
                            <TextField
                                autoFocus={true}
                                onChange={this.handleChange('nome')}
                                value={contactForm.nome || ''}
                                id='nome'
                                label={`${translate('nome')} *`} />
                            <TextField
                                onChange={this.handleChange('email')}
                                value={contactForm.email || ''}
                                id='email'
                                label={`${translate('email')} *`} />
                            <TextField
                                multiline
                                rows={4}
                                onChange={this.handleChange('descricao')}
                                value={contactForm.descricao || ''}
                                id='descricao'
                                label={translate('descricao')} />
                        </div>

                    )
                }}
            </Translate>
        )
    }
}

export default withLocalize(Contact)
