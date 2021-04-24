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
        $image.src = `./assets/images/night/0${hour}.jpg`
    }

    else if (hour >= 6 && hour < 10) {
        $image.src = `./assets/images/morning/0${hour}.jpg`
    } else if (hour >= 10 && hour < 12) {
        $image.src = `./assets/images/morning/${hour}.jpg`
    } else if (hour >= 12 && hour < 18) {
        $image.src = `./assets/images/day/${hour}.jpg`
    } else if (hour >= 18 && hour < 24) {
        if (hour > 20) {
            newHour = "0" + String(hour)[1];
            $image.src = `./assets/images/evening/${newHour}.jpg`
        } else {
            $image.src = `./assets/images/evening/${hour}.jpg`
        }
    }

    return $image.src;
}

getImage();

const $next = document.querySelector('.next-js');
$next.onclick = () => {
    if (/assets/.test($image.src)) {
        hour = +hour + 1;
        if (hour > 20) {
            hour = "0" + String(hour)[1];
        }
        if (String(hour).length < 2) {
            hour = '0' + hour;
        }
        $image.src = $image.src.slice(0, $image.src.length - 6) + hour + '.jpg';
    } else {
        hour = date.getHours();
        getImage();
    }
}

document.querySelector('.file-input').onchange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    $image.src = url;
    document.querySelector('.file-input').value = '';
}

const $valueBlur = document.querySelector('.js-filter-blur-label');
const $blur = document.querySelector('.js-filter-blur');

const $valueInvert = document.querySelector('.js-filter-invert-label');
const $invert = document.querySelector('.js-filter-invert');

const $valueSaturate = document.querySelector('.js-filter-saturate-label');
const $saturate = document.querySelector('.js-filter-saturate');

const $valueSepia = document.querySelector('.js-filter-sepia-label');
const $sepia = document.querySelector('.js-filter-sepia');

const $valueHue = document.querySelector('.js-filter-hue-label');
const $hue = document.querySelector('.js-filter-hue');

$blur.oninput = (e) => {
    let prevFilter = $image.style.filter;
    prevFilter = prevFilter.split(' ').filter((el) => !/^blur/.test(el)).join(' ')
    $image.style.filter = prevFilter + ' ' + `blur(${e.target.value}px)`;
    $valueBlur.textContent = e.target.value;
}

$invert.oninput = (e) => {
    let prevFilter = $image.style.filter;
    prevFilter = prevFilter.split(' ').filter((el) => !/^invert/.test(el)).join(' ')
    $image.style.filter = prevFilter + ' ' + `invert(${e.target.value}%)`;
    $valueInvert.textContent = e.target.value;
}

$saturate.oninput = (e) => {
    let prevFilter = $image.style.filter;
    prevFilter = prevFilter.split(' ').filter((el) => !/^saturate/.test(el)).join(' ')
    $image.style.filter = prevFilter + ' ' + `saturate(${e.target.value}%)`;
    $valueSaturate.textContent = e.target.value;
}

$sepia.oninput = (e) => {
    let prevFilter = $image.style.filter;
    prevFilter = prevFilter.split(' ').filter((el) => !/^sepia/.test(el)).join(' ')
    $image.style.filter = prevFilter + ' ' + `sepia(${e.target.value}%)`;
    $valueSepia.textContent = e.target.value;
}

$hue.oninput = (e) => {
    let prevFilter = $image.style.filter;
    prevFilter = prevFilter.split(' ').filter((el) => !/^hue/.test(el)).join(' ')
    $image.style.filter = prevFilter + ' ' + `hue-rotate(${e.target.value}deg)`;
    $valueHue.textContent = e.target.value;
}

const $reset = document.querySelector('.reset-js');
$reset.onclick = () => {
    $image.style.filter = '';

    $blur.value = 0;
    $valueBlur.textContent = 0;

    $invert.value = 0;
    $valueInvert.textContent = 0;

    $saturate.value = 100;
    $valueSaturate.textContent = 100;

    $sepia.value = 0;
    $valueSepia.textContent = 0;

    $hue.value = 0;
    $valueHue.textContent = 0;
}

const $saveImg = document.querySelector('.save-js');

$saveImg.onclick = () => {
    const $canvas = document.createElement('canvas');

    const computedStyle = getComputedStyle($image);
    $canvas.width = parseInt(computedStyle.width);
    $canvas.height = parseInt(computedStyle.height);

    const ctx = $canvas.getContext('2d');

    ctx.filter = $image.style.filter;

    ctx.drawImage($image, 0, 0, parseInt(computedStyle.width), parseInt(computedStyle.height));

    const url = $canvas.toDataURL('image/png');

    const $a = document.createElement('a');
    $a.href = url;
    $a.download = 'img.png';
    $a.click();
}

const $aside = document.querySelector('.aside-right');
const $fullScreen = document.querySelector('.full-screen');
const $exitFullScreen = document.querySelector('.exit-full-screen');
$fullScreen.onclick = () => {
    document.body.requestFullscreen();
    $fullScreen.classList.add('hidden');
    $exitFullScreen.classList.remove('hidden');
    // $aside.style.height = '130vh';
    // $aside.style.margin = '-14vh -2.5vw';
}

$exitFullScreen.onclick = () => {
    document.exitFullscreen();
    $fullScreen.classList.remove('hidden');
    $exitFullScreen.classList.add('hidden');
}

document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreenElement) {
        $fullScreen.classList.remove('hidden');
        $exitFullScreen.classList.add('hidden');
    }
});

window.onbeforeunload = (e) => {
    const answer = confirm('Changes may not be saved');
    if (!answer) {
        e.preventDefault();
    }

    return answer;
}

const $menu = document.querySelector('.burger-menu');
$menu.onclick = (e) => {
    $aside.classList.remove('aside-right');
    $aside.classList.add('aside-right-active');
}

document.onclick = function (e) {
    if (e.target != $menu) {
        $aside.classList.add('aside-right');
        $aside.classList.remove('aside-right-active');
    }
}