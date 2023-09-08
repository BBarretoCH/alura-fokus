const html = document.querySelector('html');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const mensagemNegrito = document.querySelector('app__title-strong');

const opcoes = document.querySelectorAll('[data-options]');

const phrases = {
    foco: `
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>
    `,
    descansoCurto: `
   Que tal dar uma respirada?<br>
   <strong class="app__title-strong">Faça uma pausa curta!</strong>
   `,
    descansoLongo: `
   Hora de voltar à superfície.<br>
   <strong class="app__title-strong">Faça uma pausa longa.</strong>
   `
}

opcoes.forEach((e) =>{
        e.addEventListener('click', () => alterarContexto(e.innerHTML.toLocaleLowerCase().replace(/\s/g,'-')))
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = phrases.foco
            break;

            case 'descanso-curto':
            titulo.innerHTML = phrases.descansoCurto
            break;

            case 'descanso-longo':
                titulo.innerHTML = phrases.descansoLongo
                break;
        default:
            break;
    }
}