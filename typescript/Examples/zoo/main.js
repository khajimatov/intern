var ANIMALS = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));
var animalList = JSON.parse(localStorage.animals);
window.onload = function () {
    document.querySelectorAll('.animal').forEach(function (elm) {
        elm.addEventListener('click', function () { onClickAddAnimal(elm); });
    });
};
function addAnimalToStorage(elmId) {
    var animalName = prompt("Write name of the ".concat(elmId), 'Pitbull');
    var animalAgeString = prompt("Write name of the ".concat(elmId), '10');
    var animalAge = animalAgeString != null ? parseInt(animalAgeString) : 0;
    var animalType = elmId;
    var animal = { "id": Date.now(), "name": animalName, "age": animalAge, "type": animalType };
    JSON.stringify(animal);
    animalList.push(animal);
    localStorage.setItem('animals', JSON.stringify(animalList));
}
;
function onClickAddAnimal(elm) {
    document.querySelectorAll('.animal').forEach(function (elm) { elm.style.opacity = ''; });
    elm.style.opacity = '50%';
    var button = document.getElementById('addAnimalButton');
    button.textContent = "Add ".concat(elm.id);
    button.onclick = function () { addAnimalToStorage(elm.id); };
}
;
