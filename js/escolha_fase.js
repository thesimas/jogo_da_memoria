const button = document.querySelector('.fase_1');
const button2 = document.querySelector('.fase_2');
const button3 = document.querySelector('.fase_3');
const soundSelecaoFase = new Audio('./sounds/escolhaFase.mp3');


button.addEventListener('click', () => {
    soundSelecaoFase.play();
    window.location.href = 'fase_1.html';
});
button2.addEventListener('click', () => {
    soundSelecaoFase.play();
    window.location.href = 'fase_2.html';
});
button3.addEventListener('click', () => {
    soundSelecaoFase.play();
    window.location.href = 'fase_3.html';
});