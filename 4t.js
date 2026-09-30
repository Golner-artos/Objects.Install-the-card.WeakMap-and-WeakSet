const character = {
  name: "Тарас",
  level: 1,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  characteristics: {
    strength: 10,
    agility: 8,
    intelligence: 6
  },
  inventory: [],
  activeEffects: [],
 
  takeDamage(amount) {
    if (typeof amount !== "number" || amount < 0) {
      console.log("Некорректное значение урона.");
      return;
    }
    this.health = Math.max(0, this.health - amount);
    console.log(`${this.name} получил ${amount} урона. Здоровье: ${this.health}/${this.maxHealth}`);
  },
 
  heal(amount) {
    if (typeof amount !== "number" || amount < 0) {
      console.log("Некорректное значение восстановления.");
      return;
    }
    this.health = Math.min(this.maxHealth, this.health + amount);
    console.log(`${this.name} восстановил ${amount} здоровья. Здоровье: ${this.health}/${this.maxHealth}`);
  },
 
  levelUp() {
    this.level++;
    this.maxHealth += 20;
    this.maxMana += 10;
    this.health = this.maxHealth;
    this.mana = this.maxMana;
    console.log(`${this.name} повысил уровень до ${this.level}!`);
  },
 
  addItemToInventory(item) {
    this.inventory.push(item);
    console.log(`В инвентарь добавлен предмет: ${item}`);
  }
};
 
character.takeDamage(30);
character.heal(1000); 
character.takeDamage(-10); 
character.levelUp();
character.addItemToInventory("Меч");
character.addItemToInventory("Зелье маны");
console.log("Итоговый персонаж:", character);
 

console.log("Задание 2");
 
const settingNames = ["volume", "brightness", "language"];
 
const userSettings = {};
 
settingNames.forEach((settingName, index) => {
  userSettings[settingName] = index === 0 ? 80 : index === 1 ? 70 : "ua";
});
 
const settingsMethods = {
  updateSetting(obj, key, value) {
    obj[key] = value;
    console.log(`Настройка "${key}" изменена на:`, value);
  },
  removeSetting(obj, key) {
    delete obj[key];
    console.log(`Настройка "${key}" удалена.`);
  },
  getSettingValue(obj, key) {
    return obj[key];
  }
};
 
console.log("Начальные настройки:", userSettings);
settingsMethods.updateSetting(userSettings, "volume", 50);
console.log("Значение brightness:", settingsMethods.getSettingValue(userSettings, "brightness"));
settingsMethods.removeSetting(userSettings, "language");
 
console.log("Имена свойств (Object.keys):", Object.keys(userSettings));
console.log("Пары ключ-значение (Object.entries):", Object.entries(userSettings));
 
const rawPairs = [
  ["theme", "dark"],
  ["notifications", true]
];
const settingsFromPairs = Object.fromEntries(rawPairs);
console.log("Настройки, собранные через Object.fromEntries:", settingsFromPairs);
 

console.log("Задание 3");
 
const userProfile = {
  personalData: {
    name: "Ольга",
    age: 27
  },
  settings: {
    theme: "light",
    fontSize: 14
  },
  address: {
    city: "Одесса",
    street: "Дерибасовская",
  },
  friends: ["Иван", "Мария"],
  history: [
    { action: "login", date: "2026-01-01" },
    { action: "purchase", date: "2026-02-15" }
  ]
};
 
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }
 
  if (seen.has(value)) {
    return seen.get(value);
  }
 
  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);
 
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clone[key] = deepClone(value[key], seen);
    }
  }
 
  return clone;
}
 
const userProfileCopy = deepClone(userProfile);
 
userProfileCopy.personalData.name = "Олег";
userProfileCopy.address.city = "Львов";
userProfileCopy.friends.push("Петр");
userProfileCopy.history[0].action = "logout";
 
console.log("Оригинал не изменился:");
console.log("  personalData.name:", userProfile.personalData.name);
console.log("  address.city:", userProfile.address.city);
console.log("  friends:", userProfile.friends);
console.log("  history[0].action:", userProfile.history[0].action);
 
console.log("Копия изменена:");
console.log("  personalData.name:", userProfileCopy.personalData.name);
console.log("  address.city:", userProfileCopy.address.city);
console.log("  friends:", userProfileCopy.friends);
console.log("  history[0].action:", userProfileCopy.history[0].action);
 
console.log("Это разные объекты (проверка ссылок):", userProfile.address !== userProfileCopy.address);
 
console.log("Задание 4");
 
const shop = {
  products: [
    { name: "Ноутбук", price: 25000, category: "Электроника", quantity: 5 },
    { name: "Мышь", price: 500, category: "Электроника", quantity: 20 },
    { name: "Книга", price: 300, category: "Книги", quantity: 15 }
  ],
 
  findProduct(name) {
    return this.products.find(product => product.name === name);
  },
 
  removeProduct(name) {
    const index = this.products.findIndex(product => product.name === name);
    if (index !== -1) {
      this.products.splice(index, 1);
      console.log(`Товар "${name}" удален.`);
    } else {
      console.log(`Товар "${name}" не найден.`);
    }
  },
 
  changePrice(name, newPrice) {
    const product = this.findProduct(name);
    if (product) {
      product.price = newPrice;
      console.log(`Цена товара "${name}" изменена на ${newPrice}.`);
    }
  },
 
  changeQuantity(name, delta) {
    const product = this.findProduct(name);
    if (product) {
      product.quantity = Math.max(0, product.quantity + delta);
      console.log(`Количество товара "${name}": ${product.quantity}`);
    }
  },
 
  getTotalValue() {
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
};
 
console.log("Найден товар:", shop.findProduct("Мышь"));
shop.changePrice("Ноутбук", 23000);
shop.changeQuantity("Книга", -5);
console.log("Общая стоимость товаров на складе:", shop.getTotalValue());
shop.removeProduct("Мышь");
console.log("Список товаров после удаления:", shop.products);
 
const baseProduct = { name: "Наушники", price: 1200 };
const extraCharacteristics = { color: "черный", warrantyMonths: 12 };
 
const mergedWithAssign = Object.assign({}, baseProduct, extraCharacteristics);
console.log("Объединение через Object.assign():", mergedWithAssign);
 
const mergedWithSpread = { ...baseProduct, ...extraCharacteristics, quantity: 10 };
console.log("Объединение через spread-оператор:", mergedWithSpread);
 
console.log(" задание 5");
 
function Character(name, health) {
  this.name = name;
  this.health = health;
}
 
Character.prototype.attack = function () {
  console.log(`${this.name} атакует обычной атакой.`);
};
 
Character.prototype.getStatus = function () {
  console.log(`${this.name}: здоровье ${this.health}`);
};
 
function Warrior(name, health, armor) {
  Character.call(this, name, health); 
  this.armor = armor;
}
Warrior.prototype = Object.create(Character.prototype);
Warrior.prototype.constructor = Warrior;
 
Warrior.prototype.attack = function () {
  console.log(`${this.name} наносит удар мечом (броня: ${this.armor}).`);
};
Warrior.prototype.block = function () {
  console.log(`${this.name} блокирует удар щитом.`);
};
 
function Mage(name, health, mana) {
  Character.call(this, name, health);
  this.mana = mana;
}
Mage.prototype = Object.create(Character.prototype);
Mage.prototype.constructor = Mage;
 
Mage.prototype.attack = function () {
  if (this.mana >= 10) {
    this.mana -= 10;
    console.log(`${this.name} применяет огненный шар. Осталось маны: ${this.mana}.`);
  } else {
    console.log(`${this.name} не хватает маны для заклинания.`);
  }
};
 
function Archer(name, health, arrows) {
  Character.call(this, name, health);
  this.arrows = arrows;
}
Archer.prototype = Object.create(Character.prototype);
Archer.prototype.constructor = Archer;
 
Archer.prototype.attack = function () {
  if (this.arrows > 0) {
    this.arrows--;
    console.log(`${this.name} стреляет из лука. Осталось стрел: ${this.arrows}.`);
  } else {
    console.log(`${this.name}: стрелы закончились!`);
  }
};
 
const warrior = new Warrior("Богдан", 150, 20);
const mage = new Mage("Игорь", 90, 30);
const archer = new Archer("Максим", 100, 5);
 
warrior.getStatus(); 
warrior.attack();   
warrior.block();     
 
mage.getStatus();
mage.attack();
 
archer.getStatus();
archer.attack();
 
console.log("warrior — экземпляр Character:", warrior instanceof Character);
