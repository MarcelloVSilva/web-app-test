export function setAbaAtiva() {
    const paginaAtiva = window.location.pathname === '/' ? 'homeSection' : 'contactSection'

    const elemAtualAtivo = document.getElementsByClassName('paginaAtiva')[0]
    elemAtualAtivo &&
      (elemAtualAtivo.className = elemAtualAtivo.id === paginaAtiva ? elemAtualAtivo.classList : '')

    const elem = document.getElementById(paginaAtiva)
    elem.className = 'paginaAtiva'
}