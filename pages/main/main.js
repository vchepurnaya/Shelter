'use strict'

const pagesCounter = [15, 23, 47];
let pageCounter = 0;
let maxPageCounter = CheckPagesAmount(pagesCounter);

function moveToNextSlider() {
    if (pageCounter < maxPageCounter) {
        pageCounter++;
    } else if (pageCounter === maxPageCounter) {
        pageCounter = 0;
    }

    setSliderStyle();
}

function moveToPrevSlider() {
    if (pageCounter > 0) {
        pageCounter--;
    } else if (pageCounter === 0) {
        pageCounter = maxPageCounter;
    }

    setSliderStyle();
}

function setSliderStyle() {
    const petsSlider = document.querySelector('.pets__slider');
    const width = petsSlider.offsetWidth;

    petsContainer.style.right = `${width * pageCounter}px`;
}

function adaptiveMenu() {
    const menu = document.querySelector('.menu');
    const btn = document.querySelector('.header__burger');

    btn.classList.toggle('header__burger_active');
    menu.classList.toggle('menu_active');
}
