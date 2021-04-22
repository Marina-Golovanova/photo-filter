const $startPage = document.querySelector('.start-page');
const $startButton = document.querySelector('.start-page__button');
const $main = document.querySelector('.main-content');
const $footer = document.querySelector('.footer-content');

$startButton.onclick = () => {
    $startPage.classList.add('hidden');
    $main.classList.remove('hidden');
    $footer.classList.remove('hidden')
}
