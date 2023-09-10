const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const mensagemNegrito = document.querySelector('app__title-strong');
const musicaFocoInput = document.querySelector('#alternar-musica');
const volume = document.querySelector('#volume');
const startPausebt = document.querySelector('#start-pause');

const opcoes = document.querySelectorAll('[data-options]');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const somIniciar = new Audio('./sons/play.wav');
const somPausar = new Audio(('./sons/pause.mp3'));
const somTempoEsgotado = new Audio('./sons/beep.mp3');

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

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
        musica.volume = volume.value;
    } else {
        musica.pause();
    }
})

musica.volume = volume.value;
volume.addEventListener('input', ()=> {
    musica.volume = volume.value;
    console.log(musica.volume);
})

opcoes.forEach((e) => {
    e.addEventListener('click', () => {
        alterarContexto(e.innerHTML.toLocaleLowerCase().replace(/\s/g, '-'));
        e.classList.add('active');
    });
})

function alterarContexto(contexto) {
    opcoes.forEach(function(opcao){
        opcao.classList.remove('active');
    });    
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

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar();
        somTempoEsgotado.play();
        alert('tempo finalizado');
        return
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`)
}

startPausebt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        somPausar.play()
        zerar();
        return
    }
    somIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
