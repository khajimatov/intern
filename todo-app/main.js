window.onload = function () {
    const TODO = "todo";
    const DOING = "doing";
    const DONE = "done";

    !localStorage.getItem(TODO) && localStorage.setItem(TODO, JSON.stringify([]))
    !localStorage.getItem(DOING) && localStorage.setItem(DOING, JSON.stringify([]))
    !localStorage.getItem(DONE) && localStorage.setItem(DONE, JSON.stringify([]))

    let todoList = JSON.parse(localStorage.todo)
    let doingList = JSON.parse(localStorage.doing)
    let doneList = JSON.parse(localStorage.done)

    function renderCards() {
        let todoList = JSON.parse(localStorage.todo)
        let doingList = JSON.parse(localStorage.doing)
        let doneList = JSON.parse(localStorage.done)

        const todoCards = document.getElementById("todo");
        const doingCards = document.getElementById("doing");
        const doneCards = document.getElementById("done");

        todoCards.textContent = "";
        doingCards.textContent = "";
        doneCards.textContent = "";

        function listCards(id, section, className, text) {
            let newCard = document.createElement('div');
            let newCardText = document.createElement('p');
            newCard.setAttribute('class', 'card ' + className);
            newCard.setAttribute('id', id);
            newCard.setAttribute('draggable', 'true');
            newCardText.setAttribute('class', 'cardText');
            newCardText.textContent = text;

            newCard.appendChild(newCardText);
            let column = document.querySelector('#' + section);
            column && column.appendChild(newCard)
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
    }

    renderCards();

    const zone = document.querySelectorAll('.task-column');
    const card = document.querySelectorAll('.card');

    zone.forEach(elm => {
        elm.addEventListener('dragover', (e) => {
            e.preventDefault();
        })
    })

    card.forEach(elm => {
        elm.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
            console.log(e.dataTransfer)
        })
    })


    zone.forEach(elm => {
        elm.addEventListener('drop', (e) => {
            e.preventDefault();
            let elmId = e.dataTransfer.getData('text');
            e.dataTransfer.clearData();
            let transferingCard = document.getElementById(elmId);
            console.log(transferingCard)
            console.log(elmId)
            let previosSection = transferingCard.parentNode.id;
            let section = elm.querySelector('.cards').id;
            let newClassName = section === 'doing' ? 'doingCard' : 'doneCard';
            transferingCard.setAttribute('class', 'card ' + newClassName);
            let newItem = { "id": elmId, "section": section, "className": newClassName, "text": transferingCard.textContent }

            if (section === 'doing') {
                JSON.stringify(newItem);
                doingList.push(newItem);
                localStorage.setItem(DOING, JSON.stringify(doingList));
                renderCards();
            }
            else {
                JSON.stringify(newItem);
                doneList.push(newItem);
                localStorage.setItem(DONE, JSON.stringify(doneList));
                renderCards();
            }

            elm.querySelector('.cards').appendChild(transferingCard)

            if (previosSection === 'todo' && section !== 'todo') {
                const todoIndex = todoList.findIndex((elm) => elm.id.toString() === elmId);
                if (todoIndex > -1) {
                    todoList.splice(todoIndex, 1);
                    localStorage.setItem('todo', JSON.stringify(todoList));
                    renderCards();
                }
            } else if (previosSection === 'doing' && section !== 'doing') {
                const doingIndex = doingList.findIndex((elm) => elm.id.toString() === elmId);
                if (doingIndex > -1) {
                    doingList.splice(doingIndex, 1);
                    localStorage.setItem('doing', JSON.stringify(doingList));
                    renderCards();
                }
            } else if (previosSection === 'done' && section !== 'done') {
                const doneIndex = doneList.findIndex((elm) => elm.id.toString() === elmId);
                if (doneIndex > -1) {
                    doneList.splice(doneIndex, 1);
                    localStorage.setItem('done', JSON.stringify(doneList));
                    renderCards();
                }
            }
            addDragToCard()
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
            let id = Math.floor(Math.random() * 1000);
            let newCard = { "id": id, "section": "todo", "className": "todoCard", "text": document.getElementById('addCardText').value };
            JSON.stringify(newCard);
            todoList.push(newCard);
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
        renderCards();
    })
}