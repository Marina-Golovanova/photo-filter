const $startPage = document.querySelector('.start-page');
const $startButton = document.querySelector('.start-page__button');
const $main = document.querySelector('.main-content');
const $footer = document.querySelector('.footer-content');
const $image = document.querySelector('.main-content__image');
const date = new Date();
let hour = date.getHours();


$startButton.onclick = () => {
    $startPage.classList.add('hidden');
    $main.classList.remove('hidden');
    $footer.classList.remove('hidden')
}

function getImage() {
    if (hour < 6) {
        $image.src = `./assets/image/night/0${hour}.jpg`
    }

    else if (hour >= 6 && hour < 10) {
        $image.src = `./assets/images/morning/0${hour}.jpg`
    } else if (hour >= 10 && hour < 12) {
        $image.src = `./assets/images/morning/${hour}.jpg`
    } else if (hour >= 12 && hour < 18) {
        $image.src = `./assets/images/day/${hour}.jpg`
    } else if (hour >= 18 && hour < 24) {
        $image.src = `./assets/images/evening/${hour}.jpg`
    }

    console.log($image.src)
    return $image.src;
}

getImage();

const $next = document.querySelector('.next');
$next.onclick = () => {

    hour = +hour + 1;
    if (hour > 20) {
        hour = 1;
    }
    if (String(hour).length < 2) {
        hour = '0' + hour;
    }

    $image.src = $image.src.slice(0, $image.src.length - 6) + hour + '.jpg'
}