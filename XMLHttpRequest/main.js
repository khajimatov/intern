document.addEventListener('click', (e) => {
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