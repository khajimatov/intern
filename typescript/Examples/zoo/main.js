/// <reference path="logic.ts" />
var ANIMALS = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));
var animalList = JSON.parse(localStorage.animals);
window.onload = function () {
    document.querySelectorAll('.animal').forEach(function (elm) {
        elm.addEventListener('click', function () { onClickAnimal(elm); });
    });
    renderAnimals();
    // ----------------- EXPERIMENT WITH MODAL WINDOWS ----------------------
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
        if (event.target == modal) {
            onClickCancelModal(modal);
        }
    };
    // END OF EXPERIMENT
};
function addAnimalToStorage(elmId, animalName, animalAge) {
    parseInt(animalAge);
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
        button.addEventListener('click', function () { return openModal(elm.id, elm.textContent); });
    }
    ;
}
;
function openModal(elmId, elmText) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.querySelector('h3').textContent = 'You are adding a ' + elmId + ' ' + elmText;
    modal.querySelector('.cancelButton').addEventListener('click', function () { return onClickCancelModal(modal); });
    inputValidation();
    modal.querySelector('#addAnimalSubmitButton').addEventListener('click', function () { return addAnimalSubmitButton(elmId); });
}
;
function onClickCancelModal(modal) {
    modal.style.display = "none";
    document.querySelectorAll('.animal').forEach(function (elm) { elm.style.opacity = ''; });
    document.getElementById('addAnimalButton').textContent = 'Click on animal to add';
    // document.getElementById('addAnimalButton')?.removeEventListener()
}
;
function inputValidation() {
    document.getElementById('animalName').addEventListener('change', function (e) {
        var animalNameInput = e.target.value;
        if (/^[a-zA-Z]+$/.test(animalNameInput) === true) {
            document.getElementById('animalNameWarning').style.display = "none";
            console.log(animalNameInput);
        }
        else {
            document.getElementById('animalNameWarning').style.display = "block";
        }
        ;
    });
    document.getElementById('animalAge').addEventListener('change', function (e) {
        var animalAgeInput = e.target.value;
        if (/^[0-9]+$/.test(animalAgeInput) === true) {
            document.getElementById('animalAgeWarning').style.display = "none";
            console.log(animalAgeInput);
        }
        else {
            document.getElementById('animalAgeWarning').style.display = "block";
        }
        ;
    });
}
;
function addAnimalSubmitButton(elmId) {
    var animalNameInput = document.querySelector('#animalName').value;
    var animalAgeInput = document.querySelector('#animalAge').value;
    if (/^[a-zA-Z]+$/.test(animalNameInput) === true) {
        document.getElementById('animalNameWarning').style.display = "none";
    }
    else {
        document.getElementById('animalNameWarning').style.display = "block";
    }
    ;
    if (/^[0-9]+$/.test(animalAgeInput) === true) {
        document.getElementById('animalAgeWarning').style.display = "none";
    }
    else {
        document.getElementById('animalAgeWarning').style.display = "block";
    }
    ;
    if (/^[a-zA-Z]+$/.test(animalNameInput) === true && /^[0-9]+$/.test(animalAgeInput) === true) {
        addAnimalToStorage(elmId, document.querySelector('#animalName').value, document.querySelector('#animalAge').value);
        document.querySelector('#animalName').value = '';
        document.querySelector('#animalAge').value = '';
        onClickCancelModal(document.getElementById('myModal'));
    }
    ;
}
;
function renderAnimals() {
    var animalList = JSON.parse(localStorage.animals);
    var container = document.getElementById('container');
    container.innerHTML = '';
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
    h5.innerHTML = 'Age: ' + elm.age.toString() + ' Food: ' + elm.food.toString() + '<br>' + ' Happiness: ' + elm.happiness.toString() + ' Health: ' + elm.health.toString();
    feedButton.textContent = 'FEED';
    feedButton.addEventListener('click', function () { return onClickFeedButton(elm); });
    treatButton.textContent = 'TREAT';
    treatButton.addEventListener('click', function () { return onClickTreatButton(elm); });
    playButton.textContent = 'PLAY';
    playButton.addEventListener('click', function () { return onClickPlayButton(elm); });
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
function onClickFeedButton(elm) {
    var newAnimal;
    switch (elm.type) {
        case 'dog':
            newAnimal = new DogFabric(elm).factoryMethod().feed();
            break;
        case 'chicken':
            newAnimal = new ChickenFabric(elm).factoryMethod().feed();
            break;
        case 'turtle':
            newAnimal = new TurtleFabric(elm).factoryMethod().feed();
            break;
        default:
            break;
    }
    ;
    newAnimal.id = elm.id;
    var animalList = JSON.parse(localStorage.animals);
    var a = animalList.map(function (obj) { return (obj.id === newAnimal.id && newAnimal) || obj; });
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
}
;
function onClickTreatButton(elm) {
    var newAnimal;
    switch (elm.type) {
        case 'dog':
            newAnimal = new DogFabric(elm).factoryMethod().treat();
            break;
        case 'chicken':
            newAnimal = new ChickenFabric(elm).factoryMethod().treat();
            break;
        case 'turtle':
            newAnimal = new TurtleFabric(elm).factoryMethod().treat();
            break;
        default:
            break;
    }
    ;
    newAnimal.id = elm.id;
    var animalList = JSON.parse(localStorage.animals);
    var a = animalList.map(function (obj) { return (obj.id === newAnimal.id && newAnimal) || obj; });
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
}
;
function onClickPlayButton(elm) {
    var newAnimal;
    switch (elm.type) {
        case 'dog':
            newAnimal = new DogFabric(elm).factoryMethod().play();
            break;
        case 'chicken':
            newAnimal = new ChickenFabric(elm).factoryMethod().play();
            break;
        case 'turtle':
            newAnimal = new TurtleFabric(elm).factoryMethod().play();
            break;
        default:
            break;
    }
    ;
    newAnimal.id = elm.id;
    var animalList = JSON.parse(localStorage.animals);
    var a = animalList.map(function (obj) { return (obj.id === newAnimal.id && newAnimal) || obj; });
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
}
;
