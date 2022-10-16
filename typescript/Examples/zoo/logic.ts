interface Animal {
    id?: number;
    name: string;
    age: number;
    type: string;
    food: number;
    happiness: number;
    health: number;
    feed(): AnimalSelf;
    play(): AnimalSelf;
    treat(): AnimalSelf;
};
interface AnimalSelf extends Omit<Animal, "feed" | "play" | "treat"> {
};

abstract class SomeAnimal implements Animal {
    public food: number;
    public name: string;
    public age: number;
    public happiness: number;
    public health: number;
    public type: string;
    public constructor(private elm: AnimalSelf) {
        this.name = elm.name;
        this.age = elm.age;
        this.food = elm.food;
        this.happiness = elm.happiness;
        this.health = elm.health;
        this.type = elm.type;
    };
    public feed(): AnimalSelf {
        this.elm.food += 1;
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
    };
    public play(): AnimalSelf {
        this.elm.food -= 1;
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
    };
    public treat(): AnimalSelf {
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
    };
};
abstract class Fabric {
    public abstract factoryMethod(): AnimalSelf;
    public someOperation(): AnimalSelf {
        const animal = this.factoryMethod();
        return animal;
    };
};
class DogFabric extends Fabric {
    public constructor(private elm: AnimalSelf) {
        super();
    };
    public factoryMethod(): Animal {
        return new Dog(this.elm);
    };
};
class ChickenFabric extends Fabric {
    public constructor(private elm: AnimalSelf) {
        super();
    };
    public factoryMethod(): Animal {
        return new Chicken(this.elm);
    };
};
class TurtleFabric extends Fabric {
    public constructor(private elm: AnimalSelf) {
        super();
    };
    public factoryMethod(): Animal {
        return new Turtle(this.elm);
    };
};

class AnyAnimal extends SomeAnimal {
}
class Dog extends SomeAnimal {
    public type: string = "dog";
};
class Chicken extends SomeAnimal {
    public type: string = "chicken";
};
class Turtle extends SomeAnimal {
    public type: string = "turtle";
};