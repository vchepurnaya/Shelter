'use strict'

const petsContainer = document.querySelector('.pets__cards');
const popUpContainer = document.querySelector('.popup__content');
const popUp = document.querySelector('.popup');
const endPoint = '../../assets/pets.json';

let pets = [];
let fullPetsList = []; //48 elements

fetch(endPoint).then(res => res.json()).then(list => {
    pets = list;

    //IIFE
    fullPetsList = (() => {
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = pets;

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets]
        }
        return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);
    createPets(fullPetsList);
})


function createPets(petsList) {
    petsContainer.innerHTML += createElement(petsList);
}

function createElement(petsList) {
    let str = '';
    petsList.forEach(pet => {
        str += `<div class="pets__card">
                    <img
                            class="pets__card-image"
                            src="${pet.img}"
                            alt="pet ${pet.name}"
                    >
                    <div class="pets__card-content">
                        <h4 class="pets__card-title">
                            ${pet.name}
                        </h4>
                        <button class="pets__card-button" onclick="createModalPage(${pet.id})">
                            Learn more
                        </button>
                    </div>
                </div>`
    })

    return str;
}

//---------Для того, чтобы картинки на каждой странице были уникальными---------//

function sort863(list) {
    let length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);


        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, i) => {
                return item.name === stepList[j].name && (i !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                i -= 2;
                break;
            }
        }
    }

    return list;
}

function createModalPage(petId) {
    const btnClosePopUp = document.querySelector('.popup__close');
    let pet = fullPetsList.filter(pet => pet.id === petId)[0];

    popUpContainer.innerHTML += createPopUp(pet);
    popUp.style.display = `block`;
    document.body.style.overflow = 'hidden';
    popUp.addEventListener('click', resetPopUp);
    btnClosePopUp.addEventListener('click', resetPopUp);
}

function createPopUp(pet) {
    return `
        <div class="popup__img">
            <img  src="${pet.img}" alt="${pet.name}">
        </div>
        <div class="popup__description">
            <h3 class="popup__title">${pet.name}</h3>
            <h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
            <div class="popup__paragraph">
                <h5 >${pet.description}</h5>
            </div>
            <ul class="popup__info">
                <li><strong>Age:</strong>${pet.age}</li>
                <li><strong>Inoculations:</strong>${pet.inoculations}</li>
                <li><strong>Diseases:</strong>${pet.diseases}</li>
                <li><strong>Parasites:</strong>${pet.parasites}</li>
            </ul>
        </div>`
}

function resetPopUp() {
    popUpContainer.innerHTML = '<button class="popup__close"></button>';
    popUp.style.display = `none`;
    document.body.style.overflow = 'auto';
}

function CheckPagesAmount(pagesAmount) {
    const screen = window.screen.width;

    if (screen > 768 && screen < 1600) {
        return pagesAmount[0];
    } else if (screen > 320 && screen <= 768) {
        return pagesAmount[1];
    } else if (screen <= 320) {
        return pagesAmount[2];
    }
}
