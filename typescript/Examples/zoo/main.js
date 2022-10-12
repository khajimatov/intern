/// <reference path="logic.ts" />
var ANIMALS = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));
var animalList = JSON.parse(localStorage.animals);
window.onload = function () {
    document.querySelectorAll('.animal').forEach(function (elm) {
        elm.addEventListener('click', function () { onClickAnimal(elm); });
    });
    renderAnimals();
};
function addAnimalToStorage(elmId) {
    var animalName = prompt("Write name of the ".concat(elmId), 'Pitbull');
    var animalAgeString = prompt("Write name of the ".concat(elmId), '10');
    var animalAge = animalAgeString != null ? parseInt(animalAgeString) : 0;
    var animalType = elmId;
    var animal = { "id": Date.now(), "name": animalName, "age": animalAge, "type": animalType, "food": 0, "happiness": 0, "health": 0 };
    JSON.stringify(animal);
    animalList.push(animal);
    localStorage.setItem('animals', JSON.stringify(animalList));
    renderAnimals();
}
;
function onClickAnimal(elm) {
    document.querySelectorAll('.animal').forEach(function (elm) { elm.style.opacity = ''; });
    elm.style.opacity = '50%';
    var button = document.getElementById('addAnimalButton');
    if (button) {
        button.textContent = "Add ".concat(elm.id);
        button.onclick = function () { addAnimalToStorage(elm.id); };
    }
    ;
}
;
function renderAnimals() {
    var animalList = JSON.parse(localStorage.animals);
    var container = document.getElementById('container');
    if (container) {
        container.textContent = '';
    }
    ;
    animalList.map(function (elm) {
        createHTMLElements(elm, container);
    });
}
;
function createHTMLElements(elm, container) {
    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    var h4 = document.createElement('h4');
    var h5 = document.createElement('h5');
    var feedButton = document.createElement('button');
    var innerDiv = document.createElement('div');
    var treatButton = document.createElement('button');
    var playButton = document.createElement('button');
    div.setAttribute('class', 'animalCard ' + elm.type);
    if (elm.type === 'dog') {
        h3.textContent = '🐕';
    }
    else if (elm.type === 'chicken') {
        h3.textContent = '🐓';
    }
    else {
        h3.textContent = '🐢';
    }
    ;
    h4.textContent = elm.name;
    h5.textContent = 'Age: ' + elm.age.toString() + ' Food: ' + elm.food.toString() + ' Happiness: ' + elm.happiness.toString() + ' Health: ' + elm.health.toString();
    feedButton.textContent = 'FEED';
    feedButton.addEventListener('click', function (event) { return onClickFeedButton(event); });
    treatButton.textContent = 'TREAT';
    treatButton.addEventListener('click', function (event) { return onClickTreatButton(event); });
    playButton.textContent = 'PLAY';
    playButton.addEventListener('click', function (event) { return onClickPlayButton(event); });
    innerDiv.setAttribute('class', 'treatPlayButtons');
    if (elm.id) {
        innerDiv.setAttribute('id', elm.id.toString());
    }
    ;
    if (container) {
        innerDiv.append(feedButton, treatButton, playButton);
        div.append(h3, h4, h5, innerDiv);
        container.append(div);
    }
    ;
}
;
function onClickFeedButton(event) {
    var parent = event.target.parentElement;
    console.log(parent === null || parent === void 0 ? void 0 : parent.id);
}
;
function onClickTreatButton(event) {
    var parent = event.target.parentElement;
    console.log(parent === null || parent === void 0 ? void 0 : parent.id);
}
;
function onClickPlayButton(event) {
    var parent = event.target.parentElement;
    console.log(parent === null || parent === void 0 ? void 0 : parent.id);
}
;
