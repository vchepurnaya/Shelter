const petsContainer = document.querySelector('.pets__cards');
const popUpContainer = document.querySelector('.popup__content');
const popUp = document.querySelector('.popup');
const leftArrow = document.querySelector('.slider__button');
const rightArrow = document.querySelector('.slider__button_reverted');

let pets = [];
let fullPetsList = []; //48 elements
let pageCounter = 0;


const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload =  () => {
    pets = JSON.parse(request.response);

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

               /* const btnClosePopUp = document.querySelector('.popup__close');

                btnClosePopUp.addEventListener('click', (e) => {
                    popUp.style.display = `none`;
                })*/

}

request.send();


const createPets = (petsList) => {
    petsContainer.innerHTML += createElement(petsList);
}

createElement = (petsList) => {
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
                                <button class="pets__card-button" onclick="createModalPage(${pet.id});">
                                    Learn more
                                </button>
                            </div>
                        </div>`
    })

    return str;
}

const createModalPage = (petId) => {
    let pet = fullPetsList.filter(pet => pet.id === petId)[0];
    popUpContainer.innerHTML += createPopUp(pet);
    popUp.style.display = `block`;
    document.body.style.overflow = 'hidden';
}

createPopUp = (pet) => {
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

const sort863 = (list) => {
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


leftArrow.addEventListener('click', (e) => {
    if (pageCounter > 0) {
        pageCounter--;
    }
    petsContainer.style.top = `${-438.667 * pageCounter}px`;
    petsContainer.style.transition = `0.5s ease-in-out`;
});

rightArrow.addEventListener('click', (e) => {
    if (pageCounter < 15) {
        pageCounter++;
    }
    petsContainer.style.top = `${-438.667 * pageCounter}px`;
    petsContainer.style.transition = `0.5s ease-in-out`;
});
