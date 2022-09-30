document.addEventListener('click', (e) => {
    switch (e.target.className) {
        case "renderItems":
            renderItems();
            break;
        case "buttonDelete":
            deleteItem(e.target.parentNode.parentNode.parentNode.id)
            break;
        case "buttonEdit":
            console.log(e.target.parentNode.parentNode.parentNode.id)
            break;
        case "buttonAdd":
            console.log(e.target.parentNode.parentNode.parentNode.id)
            break;
    }
})