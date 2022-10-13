"use strict";
var StoragePlace;
(function (StoragePlace) {
    StoragePlace["Icebox"] = "Icebox";
    StoragePlace["Showcase"] = "Showcase";
})(StoragePlace || (StoragePlace = {}));
;
;
;
class Product {
    constructor() {
        this.deliveryTimestamp = new Date();
        this.storagePlace = StoragePlace.Icebox;
        this.storageLifeDays = 0;
        this.name = "";
    }
    isFresh() {
        return (this.deliveryTimestamp.getTime() + this.storageLifeDays * 24 * 60 * 60 * 1000) > new Date().getTime();
    }
}
;
class Store {
    constructor() {
        this.classes = [Milk, Salt, Fish, Corn, Stew];
        this.products = [];
        for (let i = 0; i < 20; i++) {
            let index = Math.floor(Math.random() * 5) + 0;
            this.products.push(new this.classes[index](this.getRandomStoragePlace(), this.getRandomDeliveryTime()));
        }
    }
    doInspection() {
        let table = [];
        this.products.forEach(product => {
            let days = Math.floor((Date.now() - product.deliveryTimestamp.getTime()) / (1000 * 3600 * 24));
            table.push({
                "Product": product.name, "Delivered at": product.deliveryTimestamp.toDateString().slice(4),
                "Time past": `${days} days`, "Storage Place": product.storagePlace, "S. Life Days": product.storageLifeDays, "Fresh": product.isFresh()
            });
        });
        console.table(table);
    }
    getRandomDeliveryTime() {
        let randomNumber = Math.floor(Math.random() * 200) + 1;
        let deliveryTimestamp = new Date(Date.now() - (86400000 * randomNumber));
        return deliveryTimestamp;
    }
    getRandomStoragePlace() {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            return StoragePlace.Icebox;
        }
        return StoragePlace.Showcase;
    }
}
;
class Milk extends Product {
    constructor(storagePlace, deliveryTimestamp) {
        super();
        this.name = 'Молоко';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 60 : 30;
    }
    ;
}
;
class Salt extends Product {
    constructor(storagePlace, deliveryTimestamp) {
        super();
        this.name = 'Соль';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = Number.POSITIVE_INFINITY;
    }
    ;
}
;
class Fish extends Product {
    constructor(storagePlace, deliveryTimestamp) {
        super();
        this.name = 'Рыба';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 20 : Math.floor(20 / 6);
    }
    ;
}
;
class Corn extends Product {
    constructor(storagePlace, deliveryTimestamp) {
        super();
        this.name = 'Кукуруза';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = 150;
    }
    ;
}
;
class Stew extends Product {
    constructor(storagePlace, deliveryTimestamp) {
        super();
        this.name = 'Тушенка';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = 180;
    }
    ;
}
;
const store = new Store();
store.doInspection();
