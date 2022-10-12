interface Animal {
    id?: number;
    name: string;
    age: number;
    type: string;
    food: number;
    happiness: number;
    health: number;
    feed(): Animal;
    play(): Animal;
    treat(): Animal;
};

abstract class SomeAnimal implements Animal {
    public food: number;
    public happiness: number;
    public health: number;
    public abstract type: string;
    public constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
        this.food = 0;
        this.happiness = 0;
        this.health = 0;
    };
    public feed(): Animal {
        this.food += 1;
        this.happiness += 1;
        this.health += 1;
        return this;
    };
    public play(): Animal {
        this.food -= 1;
        this.happiness += 1;
        this.health += 1;
        return this;
    };
    public treat(): Animal {
        this.happiness += 1;
        this.health += 1;
        return this;
    };
};
abstract class Fabric {
    public abstract factoryMethod(): Animal;
    public someOperation(): Animal {
        const animal = this.factoryMethod();
        return animal;
    };
};
class DogFabric extends Fabric {
    public constructor(private name: string, private age: number) {
        super();
        this.name = name;
        this.age = age;
    };
    public factoryMethod(): Animal {
        return new Dog(this.name, this.age);
    };
};
class ChickenFabric extends Fabric {
    public constructor(private name: string, private age: number) {
        super();
        this.name = name;
        this.age = age;
    };
    public factoryMethod(): Animal {
        return new Chicken(this.name, this.age);
    };
};
class TurtleFabric extends Fabric {
    public constructor(private name: string, private age: number) {
        super();
        this.name = name;
        this.age = age;
    };
    public factoryMethod(): Animal {
        return new Turtle(this.name, this.age);
    };
};

class Dog extends SomeAnimal {
    public type: string = "dog";
    // public name: string = "Dog";
    // public age: number = Math.floor(Math.random() * 20) + 1;
};
class Chicken extends SomeAnimal {
    public type: string = "chicken";
    // public name: string = "Chicken";
    // public age: number = Math.floor(Math.random() * 20) + 1;
};
class Turtle extends SomeAnimal {
    public type: string = "turtle";
    // public name: string = "Turtle";
    // public age: number = Math.floor(Math.random() * 20) + 1;
};

console.log('HMMMM');
let dog = new DogFabric("Doggo", 12).factoryMethod();
let chicken = new ChickenFabric("Chikko", 5).factoryMethod();
let turtle = new TurtleFabric("Tutu", 20).factoryMethod();
dog.feed();
console.log(dog);
console.log(chicken);
console.log(turtle);