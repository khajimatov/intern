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
var StoragePlace;
(function (StoragePlace) {
    StoragePlace["Icebox"] = "Icebox";
    StoragePlace["Showcase"] = "Showcase";
})(StoragePlace || (StoragePlace = {}));
;
;
;
var Product = /** @class */ (function () {
    function Product() {
        this.deliveryTimestamp = new Date();
        this.storagePlace = StoragePlace.Icebox;
        this.storageLifeDays = 0;
        this.name = "";
    }
    Product.prototype.isFresh = function () {
        return (this.deliveryTimestamp.getTime() + this.storageLifeDays * 24 * 60 * 60 * 1000) > new Date().getTime();
    };
    return Product;
}());
;
var Store = /** @class */ (function () {
    function Store() {
        this.classes = [Milk, Salt, Fish, Corn, Stew];
        this.products = [];
        for (var i = 0; i < 20; i++) {
            var index = Math.floor(Math.random() * 5) + 0;
            this.products.push(new this.classes[index](this.getRandomStoragePlace(), this.getRandomDeliveryTime()));
        }
    }
    Store.prototype.doInspection = function () {
        var table = [];
        this.products.forEach(function (product) {
            var days = Math.floor((Date.now() - product.deliveryTimestamp.getTime()) / (1000 * 3600 * 24));
            table.push({
                "Product": product.name, "Delivered at": product.deliveryTimestamp.toDateString().slice(4),
                "Time past": "".concat(days, " days"), "Storage Place": product.storagePlace, "S. Life Days": product.storageLifeDays, "Fresh": product.isFresh()
            });
        });
        console.table(table);
    };
    Store.prototype.getRandomDeliveryTime = function () {
        var randomNumber = Math.floor(Math.random() * 200) + 1;
        var deliveryTimestamp = new Date(Date.now() - (86400000 * randomNumber));
        return deliveryTimestamp;
    };
    Store.prototype.getRandomStoragePlace = function () {
        var randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            return StoragePlace.Icebox;
        }
        return StoragePlace.Showcase;
    };
    return Store;
}());
;
var Milk = /** @class */ (function (_super) {
    __extends(Milk, _super);
    function Milk(storagePlace, deliveryTimestamp) {
        var _this = _super.call(this) || this;
        _this.name = 'Молоко';
        _this.deliveryTimestamp = deliveryTimestamp;
        _this.storagePlace = storagePlace;
        _this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 60 : 30;
        return _this;
    }
    ;
    return Milk;
}(Product));
;
var Salt = /** @class */ (function (_super) {
    __extends(Salt, _super);
    function Salt(storagePlace, deliveryTimestamp) {
        var _this = _super.call(this) || this;
        _this.name = 'Соль';
        _this.deliveryTimestamp = deliveryTimestamp;
        _this.storagePlace = storagePlace;
        _this.storageLifeDays = Number.POSITIVE_INFINITY;
        return _this;
    }
    ;
    return Salt;
}(Product));
;
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    function Fish(storagePlace, deliveryTimestamp) {
        var _this = _super.call(this) || this;
        _this.name = 'Рыба';
        _this.deliveryTimestamp = deliveryTimestamp;
        _this.storagePlace = storagePlace;
        _this.storageLifeDays = storagePlace === StoragePlace.Icebox ? 20 : Math.floor(20 / 6);
        return _this;
    }
    ;
    return Fish;
}(Product));
;
var Corn = /** @class */ (function (_super) {
    __extends(Corn, _super);
    function Corn(storagePlace, deliveryTimestamp) {
        var _this = _super.call(this) || this;
        _this.name = 'Кукуруза';
        _this.deliveryTimestamp = deliveryTimestamp;
        _this.storagePlace = storagePlace;
        _this.storageLifeDays = 150;
        return _this;
    }
    ;
    return Corn;
}(Product));
;
var Stew = /** @class */ (function (_super) {
    __extends(Stew, _super);
    function Stew(storagePlace, deliveryTimestamp) {
        var _this = _super.call(this) || this;
        _this.name = 'Тушенка';
        _this.deliveryTimestamp = deliveryTimestamp;
        _this.storagePlace = storagePlace;
        _this.storageLifeDays = 180;
        return _this;
    }
    ;
    return Stew;
}(Product));
;
var store = new Store();
store.doInspection();
