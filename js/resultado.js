const soundJogoFinalizado = new Audio('./sounds/resultado.mp3'); //

window.onload = () => {
    
    const playerNameSpan = document.querySelector('.player-name');
    const tempoFase1Span = document.getElementById('tempoFase1');
    const tempoFase2Span = document.getElementById('tempoFase2');
    const tempoFase3Span = document.getElementById('tempoFase3');
    const tempoTotalSpan = document.getElementById('tempoTotal');
    const reiniciarJogoBtn = document.getElementById('reiniciarJogo');
    const escolherFaseBtn = document.getElementById('escolherFase');
    


    const lastPlayer = localStorage.getItem('ultimoJogador');
    const tempoFase1 = localStorage.getItem('tempoFase1');
    const tempoFase2 = localStorage.getItem('tempoFase2');
    const tempoFase3 = localStorage.getItem('tempoFase3');

    const tempoFase1Seg = parseInt(localStorage.getItem('tempoFase1Segundos')) || 0;
    const tempoFase2Seg = parseInt(localStorage.getItem('tempoFase2Segundos')) || 0;
    const tempoFase3Seg = parseInt(localStorage.getItem('tempoFase3Segundos')) || 0;

    playerNameSpan.textContent = lastPlayer || 'Jogador';
    tempoFase1Span.textContent = tempoFase1 || '--:--';
    tempoFase2Span.textContent = tempoFase2 || '--:--';
    tempoFase3Span.textContent = tempoFase3 || '--:--';

    const totalTime = tempoFase1Seg + tempoFase2Seg + tempoFase3Seg;
    tempoTotalSpan.textContent = totalTime > 0 ? `${totalTime} segundos` : '--:--';

    const playFinalSoundButton = document.getElementById('play-final-sound-button'); // Novo botão

    // Tocar o som ao clicar no novo botão
    if (playFinalSoundButton) {
        playFinalSoundButton.addEventListener('click', () => {
            soundJogoFinalizado.play();
        });
    }
    reiniciarJogoBtn.addEventListener('click', () => {
        localStorage.removeItem('tempoFase1');
        localStorage.removeItem('tempoFase1Segundos');
        localStorage.removeItem('tempoFase2');
        localStorage.removeItem('tempoFase2Segundos');
        localStorage.removeItem('tempoFase3');
        localStorage.removeItem('tempoFase3Segundos');
        window.location.href = 'index.html';
    });
};
