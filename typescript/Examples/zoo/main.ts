/// <reference path="logic.ts" />
/// <reference path="strategy.ts" />
const ANIMALS: string = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));

window.onload = () => {
    renderAnimals();

    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => {
        elm.addEventListener('click', (event) => { onClickAnimal(event) });
    });

    let modal = document.getElementById("myModal")!;
    window.onclick = function (event) {
        if (event.target == modal) {
            onClickCancelModal();
        };
    };

};

function addAnimalToStorage(elmId: string, animalName: string, animalAge: string) {
    let animalList: Object[] = JSON.parse(localStorage.animals);
    parseInt(animalAge);
    const animalType: string = elmId;
    const animal: Object = { "id": Date.now(), "name": animalName, "age": animalAge, "type": animalType, "food": 0, "happiness": 0, "health": 0 };
    JSON.stringify(animal);
    animalList.push(animal);
    localStorage.setItem('animals', JSON.stringify(animalList));
    renderAnimals();
};

function onClickAnimal(e: Event) {
    let currentAnimal = (<HTMLElement>e.target);
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => {
        elm.classList.remove('clicked');
    });
    currentAnimal.classList.toggle('clicked');
    let button = document.getElementById('addAnimalButton');
    if (button) {
        button.textContent = `Add ${currentAnimal.id}`;
        button.addEventListener('click', openModal);
    };
};

const openModal = function (e: Event) {
    document.getElementById('addAnimalButton')!.removeEventListener('click', openModal);
    let currentAnimal = (<HTMLElement>e.target);
    let animalType: string = currentAnimal.textContent!.split(' ')[1];
    let modal = document.getElementById("myModal")!;
    modal.style.display = "block";
    modal.querySelector('h3')!.textContent = 'You are adding a ' + animalType;
    modal.querySelector('.cancelButton')!.addEventListener('click', onClickCancelModal);
    modal.querySelector<HTMLElement>('#addAnimalSubmitButton')!.addEventListener('click', addAnimalSubmitButton);
    modal.querySelector<HTMLElement>('#addAnimalSubmitButton')!.classList.add(animalType);
};

const onClickCancelModal = function () {
    document.querySelector<HTMLElement>('.modal')!.style.display = "none";
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => { elm.classList.remove('clicked'); });
    document.getElementById('addAnimalButton')!.textContent = 'Click on animal to add';
    document.querySelector('.cancelButton')!.removeEventListener('click', onClickCancelModal);
    document.getElementById('addAnimalButton')!.removeEventListener('click', openModal);
    document.querySelector<HTMLInputElement>('#animalName')!.value = '';
    document.querySelector<HTMLInputElement>('#animalAge')!.value = '';
};

const addAnimalSubmitButton = function (e: Event) {
    let animalNameInput: string = document.querySelector<HTMLInputElement>('#animalName')!.value;
    let animalAgeInput: string = document.querySelector<HTMLInputElement>('#animalAge')!.value;

    if (/^[a-zA-Z]+$/.test(animalNameInput) === true) {
        document.getElementById('animalNameWarning')!.style.display = "none";
    }
    else {
        document.getElementById('animalNameWarning')!.style.display = "block";
    };
    if (/^[0-9]+$/.test(animalAgeInput) === true) {
        document.getElementById('animalAgeWarning')!.style.display = "none";
    }
    else {
        document.getElementById('animalAgeWarning')!.style.display = "block";
    };

    if (/^[a-zA-Z]+$/.test(animalNameInput) === true && /^[0-9]+$/.test(animalAgeInput) === true) {
        let animalType = (<HTMLElement>e.target).classList[1];
        (<HTMLElement>e.target).classList.remove(animalType);
        addAnimalToStorage(animalType, document.querySelector<HTMLInputElement>('#animalName')!.value, document.querySelector<HTMLInputElement>('#animalAge')!.value);
        document.querySelector<HTMLInputElement>('#animalName')!.value = '';
        document.querySelector<HTMLInputElement>('#animalAge')!.value = '';
        onClickCancelModal();
    };
};

function renderAnimals() {
    let animalList: AnimalSelf[] = JSON.parse(localStorage.getItem('animals')!);
    let container = document.getElementById('container')!;
    container.innerHTML = '';
    animalList.map(elm => {
        createHTMLElements(elm, container);
    });
};

function createHTMLElements(elm: AnimalSelf, container: HTMLElement) {
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    let h5 = document.createElement('h5');
    let feedButton = document.createElement('button');
    let innerDiv = document.createElement('div');
    let treatButton = document.createElement('button');
    let playButton = document.createElement('button');
    div.setAttribute('class', 'animalCard ' + elm.type);
    div.setAttribute('id', elm.id!.toString());
    if (elm.type === 'dog') {
        h3.textContent = '????';
    } else if (elm.type === 'chicken') {
        h3.textContent = '????';
    } else {
        h3.textContent = '????';
    };
    h4.textContent = elm.name;
    h5.innerHTML = 'Age: ' + elm.age.toString() + ' Food: ' + elm.food.toString() + '<br>' + ' Happiness: ' + elm.happiness.toString() + ' Health: ' + elm.health.toString();
    feedButton.textContent = 'FEED';
    feedButton.addEventListener('click', () => onClickFeedButton(elm));
    treatButton.textContent = 'TREAT';
    treatButton.addEventListener('click', () => onClickTreatButton(elm));
    playButton.textContent = 'PLAY';
    playButton.addEventListener('click', () => onClickPlayButton(elm));
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

function onClickFeedButton(elm: AnimalSelf) {
    let newAnimal: AnimalSelf;
    if (elm.age > -1 && elm.age < 6) {
        newAnimal = new Context(new StrategyForAnimal0_5).feed(elm);
    }
    else if (elm.age > 5 && elm.age < 10) {
        newAnimal = new Context(new StrategyForAnimal6_10).feed(elm);
    }
    else {
        newAnimal = new Context(new StrategyForAnimal10_more).feed(elm);
    };
    newAnimal!.id = elm.id;
    let animalList: AnimalSelf[] = JSON.parse(localStorage.animals);
    let a: AnimalSelf[] = animalList.map(obj => (obj.id === newAnimal.id && newAnimal) || obj);
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
};
function onClickTreatButton(elm: AnimalSelf) {
    let newAnimal: AnimalSelf;
    if (elm.age > -1 && elm.age < 6) {
        newAnimal = new Context(new StrategyForAnimal0_5).treat(elm);
    }
    else if (elm.age > 5 && elm.age < 10) {
        newAnimal = new Context(new StrategyForAnimal6_10).treat(elm);
    }
    else {
        newAnimal = new Context(new StrategyForAnimal10_more).treat(elm);
    };
    newAnimal!.id = elm.id;
    let animalList: AnimalSelf[] = JSON.parse(localStorage.animals);
    let a: AnimalSelf[] = animalList.map(obj => (obj.id === newAnimal.id && newAnimal) || obj);
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
};
function onClickPlayButton(elm: AnimalSelf) {
    let newAnimal: AnimalSelf;
    if (elm.age > -1 && elm.age < 6) {
        newAnimal = new Context(new StrategyForAnimal0_5).play(elm);
    }
    else if (elm.age > 5 && elm.age < 10) {
        newAnimal = new Context(new StrategyForAnimal6_10).play(elm);
    }
    else {
        newAnimal = new Context(new StrategyForAnimal10_more).play(elm);
    };
    newAnimal!.id = elm.id;
    let animalList: AnimalSelf[] = JSON.parse(localStorage.animals);
    let a: AnimalSelf[] = animalList.map(obj => (obj.id === newAnimal.id && newAnimal) || obj);
    if (newAnimal.food <= 0) {
        killAnimal(newAnimal);
        return;
    };
    console.log(newAnimal);
    localStorage.setItem('animals', JSON.stringify(a));
    renderAnimals();
};

function killAnimal(animal: AnimalSelf) {
    let animalList: AnimalSelf[] = JSON.parse(localStorage.animals);
    let animalId = (animal.id)!.toString();
    let animalIndex = 0;
    for (let index = 0; index < animalList.length; index++) {
        if (animalList[index].id === animal.id) {
            animalIndex = index;
        };
    };
    if (animalIndex > -1) {
        animalList.splice(animalIndex, 1);
        localStorage.setItem(ANIMALS, JSON.stringify(animalList));
    };
    if (animal) {
        document.getElementById(animalId)!.remove();
    };
    renderAnimals();
};