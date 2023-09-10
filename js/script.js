const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const mensagemNegrito = document.querySelector('app__title-strong');
const musicaFocoInput = document.querySelector('#alternar-musica');
const volume = document.querySelector('#volume');
const startPausebt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imagemPlayOuPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const opcoes = document.querySelectorAll('[data-options]');

let tempoDecorridoEmSegundos = 1500;

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
            tempoDecorridoEmSegundos = 1500;
            mostrarTempo();
            break;

        case 'descanso-curto':
            titulo.innerHTML = phrases.descansoCurto
            tempoDecorridoEmSegundos = 300;
            mostrarTempo();
            break;

        case 'descanso-longo':
            titulo.innerHTML = phrases.descansoLongo
            tempoDecorridoEmSegundos = 900;
            mostrarTempo();
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        somTempoEsgotado.play();
        alert('tempo finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();


}

startPausebt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        somPausar.play();
        zerar();
        return
    }
    somIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    imagemPlayOuPause.src = "./imagens/pause.png"; 
    iniciarOuPausarBt.textContent = "Pausar";

}

function zerar() {
    clearInterval(intervaloId);
    imagemPlayOuPause.src = "./imagens/play_arrow.png";
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

