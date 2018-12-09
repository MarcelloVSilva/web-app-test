import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { withLocalize, Translate } from 'react-localize-redux';
import ContactTranslations from '../../res/translations/contact.json'
import { setAbaAtiva } from '../../res/funcs/setAbaAtiva.js';

import './Contact.css'

class Contact extends Component {
    constructor(props) {
        super(props)
        props.addTranslation(ContactTranslations)
        this.state = {
            contactForm: {},
            camposObrigatorios: [
                {
                    campo: 'nome',
                    temErro: false
                },
                {
                    campo: 'email',
                    temErro: false
                }]
                
        }
        this.salvar = this.salvar.bind(this)
        this.validaCampos = this.validaCampos.bind(this)
    }

    componentDidMount = () => {
        setAbaAtiva()
    }

    handleChange = name => event => {
        const contactForm = this.state.contactForm
        contactForm[name] = event.target.value
        this.setState({
            contactForm
        });
    }

    async salvar() {
        try {
            await this.validaCampos()
            const camposObrigatorios = [
                {
                    campo: 'nome',
                    temErro: false
                },
                {
                    campo: 'email',
                    temErro: false
                }]
            this.setState({ camposObrigatorios })
            const card = document.getElementsByClassName('card')[0]
            card.classList.toggle('rotated');
        } catch {
        }
    }

    validaCampos() {
        return new Promise((resolve) => {
            const { camposObrigatorios, contactForm } = this.state
            let contErros = 2
            let errosCampos = []
            let erro = {
                campo: '',
                temErro: ''
            }
            camposObrigatorios.some((campoObrigatorio) => {
                const valorDoCampo = contactForm[campoObrigatorio.campo]
                if (campoObrigatorio.campo === 'nome' && (!valorDoCampo || !(/[A-Za-z]/).test(valorDoCampo) || valorDoCampo === '')) {
                    campoObrigatorio.temErro = true
                    errosCampos.push(erro)
                } else if (campoObrigatorio.campo === 'email' && (!valorDoCampo || (/[@]^/).test(valorDoCampo) || valorDoCampo === '')) {
                    campoObrigatorio.temErro = true
                    errosCampos.push(erro)
                } else contErros--
            })
            contErros === 0 ? resolve() : this.setState({ camposObrigatorios })
        })
    }

    render() {
        const { contactForm, camposObrigatorios } = this.state
        return (
            <Translate>
                {({ translate }) => {
                    return (
                        <div id='contactPage'>
                            <div className="card">
                                <div className="card-contents card-front" >
                                    <div className="card-depth">
                                        <div id='contactForm'>
                                            <TextField
                                                error={camposObrigatorios[0].temErro && true}
                                                helperText={camposObrigatorios[0].temErro && translate('erroNome')}
                                                autoFocus={true}
                                                onChange={this.handleChange('nome')}
                                                value={contactForm.nome || ''}
                                                id='nome'
                                                label={`${translate('nome')} *`} />
                                            <TextField
                                                error={camposObrigatorios[1].temErro && true}
                                                helperText={camposObrigatorios[1].temErro && translate('erroEmail')}
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
                                        <Button onClick={this.salvar}>{translate('enviar')}</Button>
                                    </div>
                                </div>

                                <div className="card-contents card-back">
                                    <div className="card-depth">
                                        Sucesso
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Translate>
        )
    }
}

export default withLocalize(Contact)
