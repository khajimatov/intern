const ANIMALS: string = "animals";
!localStorage.getItem(ANIMALS) && localStorage.setItem(ANIMALS, JSON.stringify([]));
let animalList: Object[] = JSON.parse(localStorage.animals);

window.onload = () => {
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => {
        elm.addEventListener('click', () => { onClickAddAnimal(elm) });
    });
};

function addAnimalToStorage(elmId: string) {
    const animalName: string | null = prompt(`Write name of the ${elmId}`, 'Pitbull');
    let animalAgeString: string | null = prompt(`Write name of the ${elmId}`, '10');
    const animalAge: number = animalAgeString != null ? parseInt(animalAgeString) : 0;
    const animalType: string = elmId;
    const animal: Object = { "id": Date.now(), "name": animalName, "age": animalAge, "type": animalType };
    JSON.stringify(animal);
    animalList.push(animal);
    localStorage.setItem('animals', JSON.stringify(animalList));
};

function onClickAddAnimal(elm: HTMLElement) {
    document.querySelectorAll<HTMLElement>('.animal').forEach(elm => { elm.style.opacity = ''; });
    elm.style.opacity = '50%';
    let button: HTMLElement = document.getElementById('addAnimalButton')!;
    button.textContent = `Add ${elm.id}`;
    button.onclick = () => { addAnimalToStorage(elm.id) };
};