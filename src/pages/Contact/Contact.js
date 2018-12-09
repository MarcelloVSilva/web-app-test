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
        this.setInitialStateForm = this.setInitialStateForm.bind(this)
        this.setInitialStateCamposObrigatorios = this.setInitialStateCamposObrigatorios.bind(this)
        this.validaCampos = this.validaCampos.bind(this)
    }

    setInitialStateForm() {
        const contactForm = {}
        this.setState({ contactForm })
    }

    setInitialStateCamposObrigatorios() {
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
        await this.validaCampos()
        this.setInitialStateForm()
        this.setInitialStateCamposObrigatorios()
        this.rotate();
    }

    rotate() {
        const card = document.getElementsByClassName('card')[0];
        card.classList.toggle('rotated');
    }

    validaCampos() {
        return new Promise((resolve, reject) => {
            const { camposObrigatorios, contactForm } = this.state
            let contErros = 2
            let errosCampos = []
            let erro = {
                campo: '',
                temErro: ''
            }
            camposObrigatorios.map((campoObrigatorio) => {
                const valorDoCampo = contactForm[campoObrigatorio.campo]
                if (campoObrigatorio.campo === 'nome') {
                    if (!valorDoCampo || !(/[A-Za-z]/).test(valorDoCampo) || (/[0-9]/).test(valorDoCampo) || valorDoCampo === '') {
                        campoObrigatorio.temErro = true
                        errosCampos.push(erro)
                    } else {
                        contErros--
                        campoObrigatorio.temErro = false
                        errosCampos.push(erro)
                    }
                } else if (campoObrigatorio.campo === 'email') {
                    if (!valorDoCampo || !(/@/).test(valorDoCampo) || valorDoCampo === '') {
                        campoObrigatorio.temErro = true
                        errosCampos.push(erro)
                    } else {
                        contErros--
                        campoObrigatorio.temErro = false
                        errosCampos.push(erro)
                    }
                } else contErros--
                return contErros
            })
            contErros === 0 ? resolve() : reject(this.setState({ camposObrigatorios }))
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
                                    <h2>{translate('tituloContato')}</h2>
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
                                                rowsMax="4"
                                                onChange={this.handleChange('descricao')}
                                                value={contactForm.descricao || ''}
                                                id='descricao'
                                                label={translate('descricao')} />
                                        </div>
                                        <Button id='salvarContatoBtn' onClick={this.salvar}>{translate('enviar')}</Button>
                                    </div>
                                </div>

                                <div onClick={this.rotate} className="card-contents card-back">
                                    <div className="card-depth">
                                        {translate('confirmacao')}
                                        <i className="far fa-check-circle"></i>
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
