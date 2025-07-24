const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player-name');
const timer = document.querySelector('.timer');
const soundAcerto = new Audio('./sounds/acertou.mp3');
const soundErro = new Audio('./sounds/errou.mp3');
const soundFaseConcluida = new Audio('./sounds/passou_fase.mp3');

const imagens = [
    'fase_tres/castelo',
    'fase_tres/foguete',
    'fase_tres/futebol-de-botao',
    'fase_tres/patins-de-gelo',
    'fase_tres/helicoptero',
    'fase_tres/giz-de-cera',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = "";
let secondCard = "";
let lockCards = false;
let seconds = 0;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === imagens.length * 2) {
        clearInterval(this.loop);
        soundFaseConcluida.play(); // Toca o som de fase concluída

        // Um pequeno atraso para o som terminar antes de redirecionar
        setTimeout(() => {
            if (window.location.href.includes('fase_1.html')) { //
                localStorage.setItem('tempoFase1', timer.innerHTML); //
                localStorage.setItem('tempoFase1Segundos', seconds); //
                window.location.href = 'fase_2.html'; //
            } else if (window.location.href.includes('fase_2.html')) { //
                localStorage.setItem('tempoFase2', timer.innerHTML); //
                localStorage.setItem('tempoFase2Segundos', seconds); //
                window.location.href = 'fase_3.html'; //
            } else if (window.location.href.includes('fase_3.html')) { //
                localStorage.setItem('tempoFase3', timer.innerHTML); //
                localStorage.setItem('tempoFase3Segundos', seconds); //
                localStorage.setItem('ultimoJogador', localStorage.getItem('player')); //
                window.location.href = 'resultado.html'; //
            }
        }, 1500); // Ajuste o tempo conforme a duração do seu som
    }
};
function triggerAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // força reflow
  element.classList.add(className);
}

// Função para verificar se as cartas viradas são iguais
const checkCards = () => {
    const firstImage = firstCard.getAttribute('data-image');
    const secondImage = secondCard.getAttribute('data-image');

    if (firstImage === secondImage) {
        soundAcerto.play();
        firstCard.classList.add('disabled-card');
        secondCard.classList.add('disabled-card');

        firstCard.removeEventListener('click', revealCard);
        secondCard.removeEventListener('click', revealCard);

        firstCard = "";
        secondCard = "";
        lockCards = false;

        checkEndGame();
    } else {
        soundErro.play();
        triggerAnimation(firstCard, 'errou');
        triggerAnimation(secondCard, 'errou');

        setTimeout(() => {
            firstCard.classList.remove('reveal-card', 'errou');
            secondCard.classList.remove('reveal-card', 'errou');
            firstCard = "";
            secondCard = "";
            lockCards = false;
        }, 500);
    }
};


const revealCard = ({ target }) => {
    if (lockCards || target.parentNode.classList.contains('reveal-card') || target.parentNode.classList.contains('disabled-card')) {
        return;
    }

    const cardElement = target.parentNode;
    cardElement.classList.add('reveal-card');

    if (firstCard === "") {
        firstCard = cardElement;
    } else if (secondCard === "") {
        secondCard = cardElement;
        lockCards = true;
        setTimeout(() => {
            checkCards();
        }, 1000);
    }
};

const createCard = (imagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    back.style.backgroundImage = `url('./img/${imagem}.png')`;
    card.setAttribute('data-image', imagem);

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    return card;
};

const loadGame = () => {
    const duplicatedImages = [...imagens, ...imagens];
    const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);

    shuffledImages.forEach((imagem) => {
        const card = createCard(imagem);
        grid.appendChild(card);
    });

    // 🔽 Exibe todas as cartas brevemente
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('reveal-card'));

    // 🔽 Depois de 3 segundos, esconde todas e começa o jogo
    setTimeout(() => {
        allCards.forEach(card => card.classList.remove('reveal-card'));
        startTime(); // Inicia o cronômetro só depois que oculta
    }, 450);
};

const startTime = () => {
    this.loop = setInterval(() => {
        seconds++;
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        timer.innerHTML = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }, 1000);
};

window.onload = () => {
    const playerName = localStorage.getItem('player');

    // Exibe nome simples (mantém a lógica original para compatibilidade)
    const spanPlayer = document.querySelector('.player-name');
    if (spanPlayer && playerName) {
        spanPlayer.textContent = playerName;
    }

    // Mensagem motivacional na div .boas-vindas
    const boasVindasTexto = document.getElementById('boas-vindas-texto');
    if (boasVindasTexto && playerName) {
        boasVindasTexto.innerHTML = `Vamos lá, <span style="color: #2980b9">${playerName}</span>! Você consegue vencer esse desafio!`;
    }

    // Carrega o jogo e exibe as cartas por 3 segundos antes de começar
    loadGame(); // startTime será chamado dentro do loadGame após delay
};
