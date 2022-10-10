/*
Нужно создать класс Store, в конструкторе которого вы должны случайным образом сгенерировать продукты в холодильниках и на витринах.
А в методе doInspection нужно провести инспекцию продуктов, выяснив какие продукты уже исчерпали срок годности.

Продукты должны храниться в свойстве products[] класса Store, и должны генерироваться в количестве 20 штук случайным набором из 5 вариантов продукта:

Класс
Наименование
Время годности в холоде
Время годности при комнатной температуре

Milk 
Молоко
60 дней
Меньше в 2 раза

Salt
Соль
Number.POSITIVE_INFINITY
Не меняется

Fish
Рыба
20 дней
Меньше в 6 раза

Corn
Кукуруза
150 дней
Не меняется

Stew
Тушёнка
180 дней
Не меняется
qw

Каждый конкретный продукт должен наследоваться от абстрактного класса Product переопределяя три члена класса-предка:
свойство name
свойство storageLifeDays
метод IsFresh()

При генерации продуктов  и заполнении их свойств значениями используйте:
метод getRandomDeliveryTime() класса Store.
Данный метод должен случайным образом выбирать время привоза продукта (deliveryTimestamp) в диапазоне от 1 до 200 дней раньше текущей даты.
Для этого нужно сгенерировать случайное число randomNumber от 1 до 200 и получить желаемую дату привоза следующим образом:
  let deliveryTimestamp: Date = new Date(Date.now() -(86400000 * randomNumber))
метод getRandomStoragePlace() класса Store. Данный метод должен случайным образом выбрать место хранения продукта (storagePlace) из двух вариантов:
"Icebox"
"Showcase"

В результате вызова метода doInspection вы должны вывести на экран таблицу с результатами инспекции:

                   Inspection result:

 Product | Delivered at | Storage place | S. life days | Fresh 
---------+--------------+---------------+--------------+-------
    Corn | Jan 18, 2017 | Icebox        |          150 | true
    Salt | Sep 19, 2016 | Icebox        |     Infinity | true
    Fish | Jul 26, 2016 | Showcase      |           20 | false
    Fish |  Sep 6, 2016 | Icebox        |           20 | false
    Fish | Jan 19, 2017 | Icebox        |           20 | true
    Fish | Oct 14, 2016 | Showcase      |           20 | false
    Milk | Nov 17, 2016 | Icebox        |           60 | false
    Corn | Aug 27, 2016 | Icebox        |          150 | false
    Milk |  Oct 7, 2016 | Icebox        |           60 | false
    Stew | Aug 28, 2016 | Icebox        |          180 | true
    Corn | Jul 18, 2016 | Icebox        |          150 | false
    Salt | Jan 12, 2017 | Showcase      |     Infinity | true
    Fish | Sep 27, 2016 | Icebox        |           20 | false
    Milk |  Nov 3, 2016 | Showcase      |           60 | false
    Fish | Jul 27, 2016 | Showcase      |           20 | false
    Corn | Sep 12, 2016 | Icebox        |          150 | true
    Corn | Nov 10, 2016 | Showcase      |          150 | true
    Stew | Dec 20, 2016 | Icebox        |          180 | true
    Salt | Jul 31, 2016 | Showcase      |     Infinity | true
    Salt | Oct 17, 2016 | Showcase      |     Infinity | true
---------+--------------+---------------+--------------+-------

Классы в программе (каждый должен реализовать свой интерфейс):

Store
Поля:
  products : Product[]
Методы:
  doInspection() : void
  getRandomDeliveryTime() : Date
  getRandomStoragePlace() : enum
Product
Поля:
  deliveryTimestamp: DateTime
  storagePlace: enum
  storageLifeDays: number
  name: string
Методы:d
  isFresh() : boolean
*/
