/// <reference path="logic.ts" />
/// <reference path="main.ts" />
;
var StrategyForAnimal0_5 = /** @class */ (function () {
    function StrategyForAnimal0_5() {
    }
    StrategyForAnimal0_5.prototype.feed = function (animal) {
        animal.food += 10;
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
    ;
    StrategyForAnimal0_5.prototype.treat = function (animal) {
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
    ;
    StrategyForAnimal0_5.prototype.play = function (animal) {
        animal.food -= 2;
        animal.happiness += 10;
        animal.health += 10;
        return animal;
    };
    ;
    return StrategyForAnimal0_5;
}());
;
var StrategyForAnimal6_10 = /** @class */ (function () {
    function StrategyForAnimal6_10() {
    }
    StrategyForAnimal6_10.prototype.feed = function (animal) {
        animal.food += 5;
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
    ;
    StrategyForAnimal6_10.prototype.treat = function (animal) {
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
    ;
    StrategyForAnimal6_10.prototype.play = function (animal) {
        animal.food -= 5;
        animal.happiness += 5;
        animal.health += 5;
        return animal;
    };
    ;
    return StrategyForAnimal6_10;
}());
;
var StrategyForAnimal10_more = /** @class */ (function () {
    function StrategyForAnimal10_more() {
    }
    StrategyForAnimal10_more.prototype.feed = function (animal) {
        animal.food += 2;
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
    ;
    StrategyForAnimal10_more.prototype.treat = function (animal) {
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
    ;
    StrategyForAnimal10_more.prototype.play = function (animal) {
        animal.food -= 10;
        animal.happiness += 2;
        animal.health += 2;
        return animal;
    };
    ;
    return StrategyForAnimal10_more;
}());
;
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Context.prototype.feed = function (animal) {
        var newAnimal = this.strategy.feed(animal);
        return newAnimal;
    };
    ;
    Context.prototype.treat = function (animal) {
        var newAnimal = this.strategy.treat(animal);
        return newAnimal;
    };
    ;
    Context.prototype.play = function (animal) {
        var newAnimal = this.strategy.play(animal);
        return newAnimal;
    };
    ;
    return Context;
}());
;
