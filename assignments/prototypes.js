/*
  Object oriented design is commonly used in video games.  
  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

function GameObject(gameObj) {
  this.createdAt = gameObj.createdAt;
  this.name = gameObj.name;
  this.dimensions = gameObj.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

function CharacterStats(statsObj) {
  GameObject.call(this, statsObj);
  this.healthPoints = statsObj.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

function Humanoid(humanoidObj) {
  CharacterStats.call(this, humanoidObj);
  this.team = humanoidObj.team;
  this.weapons = humanoidObj.weapons;
  this.language = humanoidObj.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Hero(heroObj) {
  Humanoid.call(this, heroObj);
  this.dmg = heroObj.dmg;
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.hit = function(enemy) {
  document.getElementById(
    `${this.name}Health`
  ).innerHTML = `${this.name}: ${this.healthPoints} HP`;
  document.getElementById(
    `${enemy.name}Health`
  ).innerHTML = `${enemy.name}: ${enemy.healthPoints} HP`;

  if (this.healthPoints > 0) {
    if (enemy.healthPoints <= 0) {
      return "Game Over! Stop hitting your enemy!!!";
    }
    enemy.healthPoints = enemy.healthPoints - this.dmg;
    let message = "";
    if (enemy.healthPoints <= 0) {
      enemy.healthPoints = 0;
      message = `Now ${enemy.name} is dead. ${this.name} wins the game.`;
      document.getElementById(`over`).innerHTML = `GAME OVER!`;
    } else {
      message = `Now ${enemy.name} has ${enemy.healthPoints} health left.`;
    }
    document.getElementById(
      `${enemy.name}Health`
    ).innerHTML = `${enemy.name}: ${enemy.healthPoints} HP`;
    return `${this.name} hit ${this.dmg} damage to ${enemy.name}. ${message}`;
  } else {
    return `You are dead ${this.name}, you can't hit ${enemy.name} anymore!`;
  }
};

function Villain(villainObj) {
  Hero.call(this, villainObj);
}

Villain.prototype = Object.create(Hero.prototype);

const pudge = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 100,
  name: "Pudge",
  team: "Radiant",
  weapons: ["Hook", "Dismember"],
  language: "Butcherish",
  dmg: 20
});

const sniper = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 2
  },
  healthPoints: 75,
  name: "Sniper",
  team: "Dire",
  weapons: ["Rifle", "Sharapnel"],
  language: "Sniperish",
  dmg: 30
});

document.addEventListener("keypress", hitEnemy);

function hitEnemy(e) {
  if (e.key == "s" || e.key == "S") {
    console.log(sniper.hit(pudge));
  } else if (e.key == "p" || e.key == "P") {
    console.log(pudge.hit(sniper));
  }
}
