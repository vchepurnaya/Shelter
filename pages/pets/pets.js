'use strict'

const buttons = document.querySelectorAll('.pets__pagination-button');
let pageCounter = 0;
const pagesCounter = [5, 11, 23];
let maxPageCounter = CheckPagesAmount(pagesCounter);

function moveSliderToNext() {
    if (pageCounter < maxPageCounter) {
        pageCounter++;
    }

    switch (pageCounter) {
        case 1:
            makeActive(0);
            makeActive(1);
            break;
        case maxPageCounter:
            makeDisabled(3);
            makeDisabled(4);
            break;
    }

    setStyle(pageCounter);
    countPages();
}

function moveSliderToPrev() {
    if (pageCounter > 0) {
        pageCounter--;
    }

    switch (pageCounter) {
        case maxPageCounter - 1:
            makeActive(3);
            makeActive(4);
            break;
        case 0:
            makeDisabled(0);
            makeDisabled(1);
            break;
    }

    setStyle(pageCounter);
    countPages();
}

function moveSliderToStart() {
    pageCounter = 0;

    setStyle(pageCounter)
    makeDisabled(0);
    makeDisabled(1);
    makeActive(3);
    makeActive(4);
    countPages();
}

function moveSliderToEnd() {
    pageCounter = maxPageCounter;

    setStyle(pageCounter);
    makeDisabled(3);
    makeDisabled(4);
    makeActive(0);
    makeActive(1);
    countPages();
}

function setStyle(pageCounter) {
    const petsSlider = document.querySelector('.pets__slider');
    let height = petsSlider.offsetHeight;

    petsContainer.style.bottom = `${height * pageCounter}px`
}

function countPages() {
    buttons[2].innerText = +pageCounter + 1;
}

function makeDisabled(i) {
    buttons[i].classList.add('pets__pagination-button_disabled');
    buttons[i].setAttribute('disabled', 'disabled');
}

function makeActive(i) {
    buttons[i].classList.remove('pets__pagination-button_disabled');
    buttons[i].removeAttribute('disabled');
}

function adaptiveMenu() {
    const menu = document.querySelector('.menu');
    const btn = document.querySelector('.pet-header__burger');

    btn.classList.toggle('pet-header__burger_active');
    menu.classList.toggle('menu_active');
}
