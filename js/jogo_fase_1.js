const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player-name'); // Alterado de '.player' para '.player-name'
const timer = document.querySelector('.timer');
const soundAcerto = new Audio('./sounds/acertou.mp3');
const soundErro = new Audio('./sounds/errou.mp3');
const soundFaseConcluida = new Audio('./sounds/passou_fase.mp3');

// Array de imagens para a fase 1 do jogo
const imagens = [
    'fase_um/abacate',
    'fase_um/cenoura',
    'fase_um/banana',
    'fase_um/nabo',
];
// Função para criar um elemento HTML com uma classe específica
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = "";
let secondCard = "";
let lockCards = false; // Variável para evitar cliques extras durante a verificação
// Função para verificar se o jogo terminou
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
        soundAcerto.play()
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



// Função para revelar a carta clicada
// target é o elemento .face que foi clicado
const revealCard = ({ target }) => {
    // Se as cartas estão sendo comparadas ou já viradas, não faz nada
    if (lockCards || target.parentNode.classList.contains('reveal-card') || target.parentNode.classList.contains('disabled-card')) { // Corrigido 'disable-card' para 'disabled-card'
        return;
    }

    const cardElement = target.parentNode; // O elemento .card é o pai do .face clicado

    cardElement.classList.add('reveal-card'); // Vira a carta

    if (firstCard === "") {
        firstCard = cardElement;
    } else if (secondCard === "") {
        secondCard = cardElement;
        lockCards = true; // Bloqueia cliques enquanto as cartas são comparadas
        setTimeout(() => {
            checkCards();
        }, 1000);
    }
    
}
// Função para criar uma carta

const createCard = (imagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    back.style.backgroundImage = `url('./img/${imagem}.png')`;// Caminho da imagem
    card.setAttribute('data-image', imagem); // Adiciona o data-image ao .card

    card.appendChild(front);
    card.appendChild(back);

    // O listener de clique deve estar no card e chamar revealCard
    card.addEventListener('click', revealCard); 

    return card;
}
// Função para carregar o jogo
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

let seconds = 0;
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
