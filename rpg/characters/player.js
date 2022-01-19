"use strict";
const readline = require('readline-sync');
const dice = require('../dice/dice.js');
var Class;
(function (Class) {
 Class["Barbarian"] = "BARBARIAN";
 Class["Bard"] = "BARD";
 Class["Cleric"] = "CLERIC";
 Class["Druid"] = "DRUID";
 Class["Fighter"] = "FIGHTER";
 Class["Monk"] = "MONK";
 Class["Paladin"] = "PALADIN";
 Class["Ranger"] = "RANGER";
 Class["Rogue"] = "ROGUE";
 Class["Sorcerer"] = "SORCERER";
 Class["Wizard"] = "WIZARD";
})(Class || (Class = {}));
var Race;
(function (Race) {
 Race["Dwarf"] = "DWARF";
 Race["Elf"] = "ELF";
 Race["Gnome"] = "GNOME";
 Race["Half_Elf"] = "HALF-ELF";
 Race["Halfling"] = "HALFLING";
 Race["Half_Orc"] = "HALF-ORC";
 Race["Human"] = "HUMAN";
})(Race || (Race = {}));
class PlayerCharacter {
  constructor(name, chosenClass, race) {
    this.stats = {
      str: 0,
      con: 0,
      dex: 0,
      int: 0,
      wis: 0,
      cha: 0,
      luck: 0
    };
    this.statmod = Object.assign({}, this.stats);
    this.name = name;
    this.chosen_class = chosenClass;
    this.race = race;
  }
  setstat(value) {
    for (const val in value) {
      this.stats[val] = value[val];
      let n = this.stats[val] - PlayerCharacter.AVERAGE;
      this.statmod[val] = Math.floor(Math.abs(n) / 2) * Math.sign(n);
    }
  }
  chooseStats() {
    let initialStats = [];
    for (const i in this.stats) {
      let stat = new dice.DiceRoll(4, 6, 0, { discard: 'least' }).roll();
      if (i === 'luck') {
        this.stats.luck = stat;
      }
      else {
        initialStats.push(stat);
      }
      this.stats[i] = stat;
    }
    console.log('The stats are Strength (STR), Constitution (CON), Dexterity (DEX), Intelligence (INT), Wisdom (WIS), and Charisma (CHA).');
    console.log('Think of STR as your strength, brute force, athletic skill, etc.');
    console.log('Think of CON as your health and resistance.');
    console.log('Think of DEX as your agility, swiftness, stealth, balance, etc.');
    console.log('Think of INT as your \"book smarts\", mental recall, and logic.');
    console.log('Think of WIS as your perception.');
    console.log('Think of CHA as your persuasivenes, way with words, etc.');
    console.log('Each stat will have an ability score, which will determine any bonuses or penalties your character has in that area.');
    console.log(`Your ability scores are:\n${initialStats}\n`);
    console.log('Enter a number (1-6) or RESET to reset stat sleection.');
    let copyStats = Object.assign({}, this.stats);
    let allStats = Object.keys(this.stats);
    let current = 0;
    let arr = Object.values(this.stats);
    while (true) {
      if (current === 6) {
        break;
      }
      let val = readline.question(`${allStats[current].toUpperCase()}: `);
      if (val === 'RESET') {
        current = 0;
        copyStats = Object.assign({}, this.stats);
        arr = Object.values(this.stats);
        console.log('---RESET---');
      }
      else if (isNaN(Number(val))) {
        console.log('Enter a number from 1 to 6.');
      }
      else {
        val = Number(val);
        if (val < 1 || val > 6) {
          console.log('Enter a number from 1 to 6.');
        }
        else if (arr[val - 1] === 0) {
          console.log('Enter a number you have not previously entered.');
        }
        else {
          copyStats[allStats[current]] = this.stats[allStats[val - 1]];
          arr[val - 1] = 0;
          console.log(`Set ${allStats[current].toUpperCase()} to ${copyStats[allStats[current]]}. You used ${val}.`);
          current++;
        }
      }
    }
    this.stats = Object.assign({}, copyStats);
    console.log('Your stats are...');
    for (let i in this.stats) {
      console.log(`${i.toUpperCase()}: ${this.stats[i]}`);
    }
  }
}
PlayerCharacter.AVERAGE = 10; // Import from character
module.exports.PlayerCharacter = PlayerCharacter;
//# sourceMappingURL=player.js.map
