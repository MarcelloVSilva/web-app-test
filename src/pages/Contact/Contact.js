import React, { Component } from 'react'
import { TextField } from '@material-ui/core'

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            contactForm: {}
        }
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
            <div id='contactForm'>
                <TextField
                    autoFocus={true}
                    onChange={this.handleChange('nome')}
                    value={contactForm.nome || ''}
                    id='nome'
                    label='Nome *' />
                <TextField
                    onChange={this.handleChange('email')}
                    value={contactForm.email || ''}
                    id='email'
                    label='Email *' />
                <TextField
                    multiline
                    rows={4}
                    onChange={this.handleChange('descricao')}
                    value={contactForm.descricao || ''}
                    id='descricao'
                    label='Descrição' />
            </div>
        )
    }
}

export default Contact
