/// <reference path="logic.ts" />
/// <reference path="main.ts" />

interface Strategy {
    feed(animal: AnimalSelf): AnimalSelf;
    treat(animal: AnimalSelf): AnimalSelf;
    play(animal: AnimalSelf): AnimalSelf;
};

class StrategyForAnimal0_5 implements Strategy {
    public feed(animal: AnimalSelf): AnimalSelf {
        animal.food += 10;
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
    public treat(animal: AnimalSelf): AnimalSelf {
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
    public play(animal: AnimalSelf): AnimalSelf {
        animal.food -= 2;
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
};

class StrategyForAnimal6_10 implements Strategy {
    public feed(animal: AnimalSelf): AnimalSelf {
        animal.food += 5;
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
    public treat(animal: AnimalSelf): AnimalSelf {
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
    public play(animal: AnimalSelf): AnimalSelf {
        animal.food -= 5;
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
};

class StrategyForAnimal10_more implements Strategy {
    public feed(animal: AnimalSelf): AnimalSelf {
        animal.food += 2;
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
    public treat(animal: AnimalSelf): AnimalSelf {
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
    public play(animal: AnimalSelf): AnimalSelf {
        animal.food -= 10;
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
};

class Context {

    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }
    public feed(animal: AnimalSelf): AnimalSelf {
        let newAnimal: AnimalSelf = this.strategy.feed(animal);
        return newAnimal;
    };
    public treat(animal: AnimalSelf): AnimalSelf {
        let newAnimal: AnimalSelf = this.strategy.treat(animal);
        return newAnimal;
    };
    public play(animal: AnimalSelf): AnimalSelf {
        let newAnimal: AnimalSelf = this.strategy.play(animal);
        return newAnimal;
    };
};