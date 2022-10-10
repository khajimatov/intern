enum StoragePlace {
    Icebox = "Icebox",
    Showcase = "Showcase"
};

interface IStore {
    products: Product[];
    doInspection: () => void;
    getRandomDeliveryTime: () => Date;
    getRandomStoragePlace: () => StoragePlace;
};


interface IProduct {
    deliveryTimestamp: Date;
    storagePlace: StoragePlace;
    storageLifeDays: number;
    name: string;
    isFresh(): boolean;
};

abstract class Product implements IProduct {
    public deliveryTimestamp: Date = new Date();
    public storagePlace: StoragePlace = StoragePlace.Icebox;
    public storageLifeDays: number = 0;
    public name: string = "";
    public isFresh(): boolean {
        return (this.deliveryTimestamp.getTime() + this.storageLifeDays * 24 * 60 * 60 * 1000) > new Date().getTime();
    }
};

class Store implements IStore {
    public products: Product[];
    private classes = [Milk, Salt, Fish, Corn, Stew];
    public constructor() {
        this.products = []
        for (let i = 0; i < 20; i++) {
            let index = Math.floor(Math.random() * 5) + 0;
            this.products.push(new this.classes[index](this.getRandomStoragePlace(), this.getRandomDeliveryTime()));
        }
    }
    public doInspection(): void {
        let table: Object[] = [];
        this.products.forEach(product => {
            let days = Math.floor((Date.now() - product.deliveryTimestamp.getTime()) / (1000 * 3600 * 24));
            table.push({
                "Product": product.name, "Delivered at": product.deliveryTimestamp.toDateString().slice(4),
                "Time past": `${days} days`, "Storage Place": product.storagePlace, "S. Life Days": product.storageLifeDays, "Fresh": product.isFresh()
            });
        });
        console.table(table);
    }
    public getRandomDeliveryTime(): Date {
        let randomNumber = Math.floor(Math.random() * 200) + 1;
        let deliveryTimestamp: Date = new Date(Date.now() - (86400000 * randomNumber));
        return deliveryTimestamp;
    }
    public getRandomStoragePlace(): StoragePlace {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            return StoragePlace.Icebox;
        }
        return StoragePlace.Showcase;
    }
};

class Milk extends Product {
    public constructor(storagePlace: StoragePlace, deliveryTimestamp: Date) {
        super();
        this.name = 'Молоко';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 60 : 30;
    };
};

class Salt extends Product {
    public constructor(storagePlace: StoragePlace, deliveryTimestamp: Date) {
        super();
        this.name = 'Соль';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = Number.POSITIVE_INFINITY;
    };
};

class Fish extends Product {
    public constructor(storagePlace: StoragePlace, deliveryTimestamp: Date) {
        super();
        this.name = 'Рыба';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 20 : Math.floor(20 / 6);
    };
};

class Corn extends Product {
    public constructor(storagePlace: StoragePlace, deliveryTimestamp: Date) {
        super();
        this.name = 'Кукуруза';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = 150;
    };
};

class Stew extends Product {
    public constructor(storagePlace: StoragePlace, deliveryTimestamp: Date) {
        super();
        this.name = 'Тушенка';
        this.deliveryTimestamp = deliveryTimestamp;
        this.storagePlace = storagePlace;
        this.storageLifeDays = 180;
    };
};

const store = new Store();
store.doInspection();