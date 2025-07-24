const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const soundLoginSucesso = new Audio('./sounds/conclusao.mp3');


const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
};

input.addEventListener('input', validateInput);

button.addEventListener('click', () => {
    soundLoginSucesso.play();
    const username = input.value;
    localStorage.setItem('player', username); // Alterado de 'username' para 'player'
    window.location.href = 'escolha_fase.html';
    
});