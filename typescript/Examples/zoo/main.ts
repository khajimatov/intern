/// <reference path="logic.ts" />
const ANIMALS: string = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));
let animalList: Object[] = JSON.parse(localStorage.animals);

window.onload = () => {
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => {
        elm.addEventListener('click', () => { onClickAnimal(elm) });
    });
    renderAnimals();
};

function addAnimalToStorage(elmId: string) {
    const animalName: string | null = prompt(`Write name of the ${elmId}`, 'Pitbull');
    let animalAgeString: string | null = prompt(`Write name of the ${elmId}`, '10');
    const animalAge: number = animalAgeString != null ? parseInt(animalAgeString) : 0;
    const animalType: string = elmId;
    const animal: Object = { "id": Date.now(), "name": animalName, "age": animalAge, "type": animalType, "food": 0, "happiness": 0, "health": 0 };
    JSON.stringify(animal);
    animalList.push(animal);
    localStorage.setItem('animals', JSON.stringify(animalList));
    renderAnimals();
};

function onClickAnimal(elm: HTMLElement) {
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => { elm.style.opacity = ''; });
    elm.style.opacity = '50%';
    let button = document.getElementById('addAnimalButton');
    if (button) {
        button.textContent = `Add ${elm.id}`;
        button.onclick = () => { addAnimalToStorage(elm.id) };
    };

};

function renderAnimals() {
    let animalList: Animal[] = JSON.parse(localStorage.animals);
    let container = document.getElementById('container');
    if (container) {
        container.textContent = '';
    };
    animalList.map(elm => {
        createHTMLElements(elm, container);
    });
};

function createHTMLElements(elm: Animal, container: HTMLElement | null) {
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    let h5 = document.createElement('h5');
    let feedButton = document.createElement('button');
    let innerDiv = document.createElement('div');
    let treatButton = document.createElement('button');
    let playButton = document.createElement('button');
    div.setAttribute('class', 'animalCard ' + elm.type);
    if (elm.type === 'dog') {
        h3.textContent = '🐕';
    } else if (elm.type === 'chicken') {
        h3.textContent = '🐓';
    } else {
        h3.textContent = '🐢';
    };
    h4.textContent = elm.name;
    h5.innerHTML = 'Age: ' + elm.age.toString() + ' Food: ' + elm.food.toString() + '<br>' + ' Happiness: ' + elm.happiness.toString() + ' Health: ' + elm.health.toString();
    feedButton.textContent = 'FEED';
    feedButton.addEventListener('click', (event) => onClickFeedButton(event));
    treatButton.textContent = 'TREAT';
    treatButton.addEventListener('click', (event) => onClickTreatButton(event));
    playButton.textContent = 'PLAY';
    playButton.addEventListener('click', (event) => onClickPlayButton(event));
    innerDiv.setAttribute('class', 'treatPlayButtons');
    if (elm.id) {
        innerDiv.setAttribute('id', elm.id.toString());
    };
    if (container) {
        innerDiv.append(feedButton, treatButton, playButton);
        div.append(h3, h4, h5, innerDiv);
        container.append(div);
    };
};

function onClickFeedButton(event: Event) {
    let parent = (<HTMLElement>event.target).parentElement;
    console.log(parent?.id);
};
function onClickTreatButton(event: Event) {
    let parent = (<HTMLElement>event.target).parentElement;
    console.log(parent?.id);
};
function onClickPlayButton(event: Event) {
    let parent = (<HTMLElement>event.target).parentElement;
    console.log(parent?.id);
};