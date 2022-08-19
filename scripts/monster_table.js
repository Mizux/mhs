import data from "./monster_data.js";

const icon_size = 32;
const monster_size = icon_size * 2;
const egg_size = monster_size;

function createImg(type, name, extension='.svg', size=icon_size) {
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/${type}/${name}${extension}`);
  img.setAttribute('height', size);
  img.setAttribute('width', size);
  img.setAttribute('alt', name);
  return img;
}

// Return an HTML table with all data.
export default function generateMonsterTable() {
  const table = document.createElement('table');
  addHeader(table);
  addBody(table, data);
  return table;
}

// Generate header line
function addHeader(table) {
  const head = table.createTHead();
  const tr = head.insertRow();
  const columns = ['Icon', 'Egg', 'Name', 'Atk', 'Mad', 'Weapon', 'Elem.']
  columns.forEach(function(item, /*index*/) {
    const th = document.createElement('th');
    tr.appendChild(th);
    const txt = document.createTextNode(item);
    th.appendChild(txt);
  });
}

// Generate each row
function addBody(table, data) {
  const body = table.createTBody();
  data.forEach(function(row, index) {
    const tr = body.insertRow();
    console.assert(row.length === 7, `row ${index}: Expect of size 7 (${row.length} instead)`);

    // Icon/Id
    const first = tr.insertCell();
    first.setAttribute('class', 'container');
    const monster_img = createMonsterImg(row[1]);
    first.appendChild(monster_img);
    const id = document.createElement('div');
    id.setAttribute('class', 'id');
    id.appendChild(document.createTextNode(`No. ${row[0]}`));
    first.appendChild(id);

    // Egg
    const egg = tr.insertCell();
    egg.setAttribute('class', 'egg');
    const egg_img = createEggImg(row[2] ? row[1] : 'Unavailable');
    egg.appendChild(egg_img);

    // Name
    const name = tr.insertCell();
    name.setAttribute('class', 'name');
    name.appendChild(document.createTextNode(row[1]));

    // Normal Atk
    const atk = tr.insertCell();
    atk.setAttribute('class', 'atk');
    addAtkType(atk, row[3]);

    // Enraged Atk
    const enraged = tr.insertCell();
    enraged.setAttribute('class', 'atk');
    addAtkType(enraged, row[4]);

    // Weapon Weakness
    const weapon = tr.insertCell();
    weapon.setAttribute('class', 'weapon');
    addWeaponWeakness(weapon, row[5]);

    // Type Weakness
    const element = tr.insertCell();
    element.setAttribute('class', 'element');
    addElementWeakness(element, row[6]);
  });
}

// Monster
function createMonsterImg(name) {
  return createImg('monster', name, '.png', monster_size);
}
function createEggImg(name) {
  return createImg('egg', name, '.svg', egg_size);
}

// Atk stuff
const atks = ['power', 'technical', 'speed', 'unknown'];
const atks_img = new Map();
atks.forEach(function(atk) {
  atks_img.set(atk, createAtkTypeImg(atk));
});

function createAtkTypeImg(name) {
  return createImg('atk', name, '.svg');
}

function addAtkType(node, str) {
  atks.forEach(function(atk) {
    if (str.includes(atk)) {
      node.appendChild(atks_img.get(atk).cloneNode());
    }
  });
}

// Weapon Stuff
const weapons = ['slash', 'pierce', 'blunt'];
const weapons_img = new Map();
weapons.forEach(function(weapon) {
  weapons_img.set(weapon, createWeaponTypeImg(weapon));
});
const weapons_not_img = new Map();
weapons.forEach(function(weapon) {
  weapons_not_img.set(weapon, createWeaponTypeImg(weapon + '-not'));
});

function createWeaponTypeImg(name) {
  return createImg('weapon', name, '.svg');
}

function addWeaponWeakness(node, arr) {
  if (!Array.isArray(arr)) {
    addPartWeaponWeakness(node, arr)
    return;
  }

  arr.forEach(function(item) {
    if (!Array.isArray(item)) {
      addWeaponWeakness(node, item);
    } else {
      node.appendChild(document.createTextNode(`${item[0]}: `));
      addWeaponWeakness(node, item.slice(1));
    }
    node.appendChild(document.createElement('br'));
  });
}

function addPartWeaponWeakness(node, str) {
  weapons.forEach(function(weapon) {
    if (str.includes(weapon)) {
      node.appendChild(weapons_img.get(weapon).cloneNode());
    } else {
      node.appendChild(weapons_not_img.get(weapon).cloneNode());
    }
  });
}

// Element stuff
const elements = ['none', 'water', 'fire', 'ice', 'thunder', 'dragon'];
const elements_img = new Map();
elements.forEach(function(element) {
  elements_img.set(element, createElementTypeImg(element));
});

function createElementTypeImg(name) {
  return createImg('element', name, '.svg');
}

function addElementWeakness(node, str) {
  elements.forEach(function(element) {
    if (str.includes(element)) {
      node.appendChild(elements_img.get(element).cloneNode());
    }
  });
}
