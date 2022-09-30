function fetchData(method, URL, body = null) {

    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, URL)
        if (method === 'GET') {
            xhr.responseType = 'json'
            xhr.send()
        } else {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = 'json'
            xhr.send(body)
        }

        xhr.onload = function () {
            xhr.status != 200 && rej(`Не удалось достучиться до сервера, ошибка ${xhr.status}: ${xhr.statusText}`)
            res(xhr.response)
        };
    })

}
async function renderItems() {

    document.getElementsByClassName('renderItems').textContent = "Загружаю..."
    const response = await fetchData('GET', 'https://6333d285433198e79dc9c3fd.mockapi.io/orders').then(res => res)

    const renderButton = document.querySelector('.renderItems');
    renderButton.textContent = 'Обновить список заказов';

    document.getElementById('ordCount').innerText = response.length;

    const h3 = document.getElementById('listTitle')
    h3.style.display = "";
    h3.innerText = response.length > 0 ? "Список заказов:" : "Заказов нет :("

    const elems = response.map(element => `<li id="${element.id}"><div class="listWrapper"><span class="listText">${element.title}</span><div class="container"><button class="buttonDelete" title="Удалить">X</button><button class="buttonAdd" title="Добавить">+</button><button class="buttonEdit" title="Редактировать">~</button></div></div></li>`);
    document.getElementById('list').innerHTML = elems.join('');

}

async function addItem() {

    document.getElementById('formAddItem').style.display = "block";
    const buttonAddItem = document.getElementById('buttonAddItem');
    const inputNewItemTitle = document.getElementById('newItemTitle');

    buttonAddItem.onclick = async function () {
        let obj = { "title": inputNewItemTitle.value };
        let json = JSON.stringify(obj)
        let node = document.createElement('li');
        node.appendChild(document.createTextNode(inputNewItemTitle.value));
        document.getElementById('list').appendChild(node);
        document.getElementById('formAddItem').style.display = "none";
        await fetchData('POST', 'https://6333d285433198e79dc9c3fd.mockapi.io/orders', json).then(res => res)
        renderItems();
    }

}
function editItem(liId) {

    const container = document.getElementById(liId).querySelector('.container');
    const listText = document.getElementById(liId).querySelector('.listWrapper').querySelector('.listText');
    const inputBox = document.createElement('input');
    const buttonEditTitle = document.createElement('button');
    buttonEditTitle.textContent = "Изменить";

    container.style.display = "none";
    inputBox.value = listText.textContent;
    container.before(inputBox);
    inputBox.after(buttonEditTitle);
    listText.textContent = "";

    buttonEditTitle.onclick = () => {

        liId.toString();
        let obj = { "title": inputBox.value, "id": liId };
        let json = JSON.stringify(obj)
        fetchData('PUT', `https://6333d285433198e79dc9c3fd.mockapi.io/orders/${obj.id}`, json).then(res => res).catch(rej => alert(rej))

        listText.textContent = inputBox.value;
        buttonEditTitle.style.display = "none";
        inputBox.style.display = "none";
    };
}

async function deleteItem(liId) {
    let obj = { "id": liId };
    let json = JSON.stringify(obj)
    document.getElementById(liId).remove()
    await fetchData('DELETE', `https://6333d285433198e79dc9c3fd.mockapi.io/orders/${obj.id}`, json).then(res => res).catch(rej => alert(rej))
    renderItems();
}

window.onload = () => {
    document.getElementById('wrapper').addEventListener('click', (e) => {
        switch (e.target.className) {
            case "renderItems":
                renderItems();
                break;
            case "buttonDelete":
                deleteItem(e.target.parentNode.parentNode.parentNode.id)
                break;
            case "buttonEdit":
                editItem(e.target.parentNode.parentNode.parentNode.id)
                break;
            case "buttonAdd":
                addItem();
                break;
        }
    })
}