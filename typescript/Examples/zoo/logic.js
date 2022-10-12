var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
;
var SomeAnimal = /** @class */ (function () {
    function SomeAnimal(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
        this.food = 0;
        this.happiness = 0;
        this.health = 0;
    }
    ;
    SomeAnimal.prototype.feed = function () {
        this.food += 1;
        this.happiness += 1;
        this.health += 1;
        return this;
    };
    ;
    SomeAnimal.prototype.play = function () {
        this.food -= 1;
        this.happiness += 1;
        this.health += 1;
        return this;
    };
    ;
    SomeAnimal.prototype.treat = function () {
        this.happiness += 1;
        this.health += 1;
        return this;
    };
    ;
    return SomeAnimal;
}());
;
var Fabric = /** @class */ (function () {
    function Fabric() {
    }
    Fabric.prototype.someOperation = function () {
        var animal = this.factoryMethod();
        return animal;
    };
    ;
    return Fabric;
}());
;
var DogFabric = /** @class */ (function (_super) {
    __extends(DogFabric, _super);
    function DogFabric(name, age) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.age = age;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    ;
    DogFabric.prototype.factoryMethod = function () {
        return new Dog(this.name, this.age);
    };
    ;
    return DogFabric;
}(Fabric));
;
var ChickenFabric = /** @class */ (function (_super) {
    __extends(ChickenFabric, _super);
    function ChickenFabric(name, age) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.age = age;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    ;
    ChickenFabric.prototype.factoryMethod = function () {
        return new Chicken(this.name, this.age);
    };
    ;
    return ChickenFabric;
}(Fabric));
;
var TurtleFabric = /** @class */ (function (_super) {
    __extends(TurtleFabric, _super);
    function TurtleFabric(name, age) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.age = age;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    ;
    TurtleFabric.prototype.factoryMethod = function () {
        return new Turtle(this.name, this.age);
    };
    ;
    return TurtleFabric;
}(Fabric));
;
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "dog";
        return _this;
        // public name: string = "Dog";
        // public age: number = Math.floor(Math.random() * 20) + 1;
    }
    return Dog;
}(SomeAnimal));
;
var Chicken = /** @class */ (function (_super) {
    __extends(Chicken, _super);
    function Chicken() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "chicken";
        return _this;
        // public name: string = "Chicken";
        // public age: number = Math.floor(Math.random() * 20) + 1;
    }
    return Chicken;
}(SomeAnimal));
;
var Turtle = /** @class */ (function (_super) {
    __extends(Turtle, _super);
    function Turtle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "turtle";
        return _this;
        // public name: string = "Turtle";
        // public age: number = Math.floor(Math.random() * 20) + 1;
    }
    return Turtle;
}(SomeAnimal));
;
console.log('HMMMM');
var dog = new DogFabric("Doggo", 12).factoryMethod();
var chicken = new ChickenFabric("Chikko", 5).factoryMethod();
var turtle = new TurtleFabric("Tutu", 20).factoryMethod();
dog.feed();
console.log(dog);
console.log(chicken);
console.log(turtle);
