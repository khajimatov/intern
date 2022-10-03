window.onload = function () {
    const TODO = "todo";
    const DOING = "doing";
    const DONE = "done";

    !localStorage.getItem(TODO) && localStorage.setItem(TODO, JSON.stringify([]));
    !localStorage.getItem(DOING) && localStorage.setItem(DOING, JSON.stringify([]));
    !localStorage.getItem(DONE) && localStorage.setItem(DONE, JSON.stringify([]));

    let todoList = JSON.parse(localStorage.todo);
    let doingList = JSON.parse(localStorage.doing);
    let doneList = JSON.parse(localStorage.done);

    function renderCards() {

        let todoList = JSON.parse(localStorage.todo);
        let doingList = JSON.parse(localStorage.doing);
        let doneList = JSON.parse(localStorage.done);

        const todoCards = document.getElementById("todo");
        const doingCards = document.getElementById("doing");
        const doneCards = document.getElementById("done");

        todoCards.textContent = "";
        doingCards.textContent = "";
        doneCards.textContent = "";

        function listCards(id, section, className, text) {

            let newCard = document.createElement('div');
            let newCardText = document.createElement('p');
            newCard.classList.add('card', className);
            newCard.setAttribute('id', id);
            newCard.setAttribute('draggable', 'true');
            newCardText.setAttribute('class', 'cardText');
            newCardText.textContent = text;

            newCard.appendChild(newCardText);
            let column = document.querySelector('#' + section);
            column.appendChild(newCard);

        }

        todoList.map((elm) => {
            listCards(elm.id, elm.section, elm.className, elm.text);
        })

        doingList.map((elm) => {
            listCards(elm.id, elm.section, elm.className, elm.text);
        })

        doneList.map((elm) => {
            listCards(elm.id, elm.section, elm.className, elm.text);
        })

        const card = document.querySelectorAll('.card');
        card.forEach(elm => {
            elm.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.id);
                console.log('Есть триггер захвата' + e.dataTransfer);
            })
        })


    }

    renderCards();

    const zone = document.querySelectorAll('.task-column');

    zone.forEach(elm => {
        elm.addEventListener('dragover', (e) => {
            e.preventDefault();
        })
        elm.addEventListener('dragleave', (e) => {
            e.preventDefault();
        })
    })


    zone.forEach(elm => {
        elm.addEventListener('drop', (e) => {
            e.preventDefault();

            let elmId = e.dataTransfer.getData('text');
            let transferingCard = document.getElementById(elmId);

            let previosSection = transferingCard.parentNode.id;

            let nextSection = elm.querySelector('.cards').id;

            switch (nextSection) {
                case "doing":
                    newClassName = "doingCard";
                    break;
                case "done":
                    newClassName = "doneCard";
                    break;
                case "todo":
                    newClassName = "todoCard";
                    break;
                case previosSection:
                    newClassName = previosSection + "Card";
                    break;
            }

            transferingCard.classList.add('card', newClassName);

            let newItem = { "id": elmId, "section": nextSection, "className": newClassName, "text": transferingCard.textContent }

            if (nextSection !== previosSection) {
                if (nextSection === "doing") {
                    JSON.stringify(newItem);
                    doingList.push(newItem);
                    localStorage.setItem(DOING, JSON.stringify(doingList));
                }
                else if (nextSection === "done") {
                    JSON.stringify(newItem);
                    doneList.push(newItem);
                    localStorage.setItem(DONE, JSON.stringify(doneList));
                }
                else if (nextSection === "todo") {
                    JSON.stringify(newItem);
                    todoList.push(newItem);
                    localStorage.setItem(TODO, JSON.stringify(todoList));
                }
                if (previosSection === 'todo') {
                    const todoIndex = todoList.findIndex((elm) => elm.id.toString() === elmId);
                    if (todoIndex > -1) {
                        todoList.splice(todoIndex, 1);
                        localStorage.setItem(TODO, JSON.stringify(todoList));
                    }
                } else if (previosSection === 'doing') {
                    const doingIndex = doingList.findIndex((elm) => elm.id.toString() === elmId);
                    if (doingIndex > -1) {
                        doingList.splice(doingIndex, 1);
                        localStorage.setItem(DOING, JSON.stringify(doingList));
                    }
                } else if (previosSection === 'done') {
                    const doneIndex = doneList.findIndex((elm) => elm.id.toString() === elmId);
                    if (doneIndex > -1) {
                        doneList.splice(doneIndex, 1);
                        localStorage.setItem(DONE, JSON.stringify(doneList));
                    }
                }
                elm.querySelector('.cards').appendChild(transferingCard)
                renderCards();
            }
        })
    })

    document.getElementById('addCardButton').addEventListener('click', () => {
        const addCardText = document.getElementById('addCardText').value;
        if (addCardText === "") {
            document.querySelector('.warning').style.display = "block";
        }
        else {
            document.querySelector('.warning').style.display = "none";
            let todoList = JSON.parse(localStorage.todo);
            let id = Math.floor(Math.random() * 10000);
            let newCard = { "id": id, "section": "todo", "className": "todoCard", "text": document.getElementById('addCardText').value };
            JSON.stringify(newCard);
            todoList.push(newCard);
            localStorage.setItem('todo', JSON.stringify(todoList));
            renderCards();
        }
    })
}