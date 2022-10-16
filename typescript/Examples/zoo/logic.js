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
;
var SomeAnimal = /** @class */ (function () {
    function SomeAnimal(elm) {
        this.elm = elm;
        this.name = elm.name;
        this.age = elm.age;
        this.food = elm.food;
        this.happiness = elm.happiness;
        this.health = elm.health;
    }
    ;
    SomeAnimal.prototype.feed = function () {
        this.elm.food += 1;
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
    };
    ;
    SomeAnimal.prototype.play = function () {
        this.elm.food -= 1;
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
    };
    ;
    SomeAnimal.prototype.treat = function () {
        this.elm.happiness += 1;
        this.elm.health += 1;
        return this.elm;
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
    function DogFabric(elm) {
        var _this = _super.call(this) || this;
        _this.elm = elm;
        return _this;
    }
    ;
    DogFabric.prototype.factoryMethod = function () {
        return new Dog(this.elm);
    };
    ;
    return DogFabric;
}(Fabric));
;
var ChickenFabric = /** @class */ (function (_super) {
    __extends(ChickenFabric, _super);
    function ChickenFabric(elm) {
        var _this = _super.call(this) || this;
        _this.elm = elm;
        return _this;
    }
    ;
    ChickenFabric.prototype.factoryMethod = function () {
        return new Chicken(this.elm);
    };
    ;
    return ChickenFabric;
}(Fabric));
;
var TurtleFabric = /** @class */ (function (_super) {
    __extends(TurtleFabric, _super);
    function TurtleFabric(elm) {
        var _this = _super.call(this) || this;
        _this.elm = elm;
        return _this;
    }
    ;
    TurtleFabric.prototype.factoryMethod = function () {
        return new Turtle(this.elm);
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
    }
    return Turtle;
}(SomeAnimal));
;
