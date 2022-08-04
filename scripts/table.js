const icon_size = 32;

// Return an HTML table with all data.
export default function generateTable(data) {
  const table = document.createElement('table');
  generateHeader(table, data[0]);
  generateBody(table, data.slice(1));
  console.log({table});
  return table;
}

// Generate header line
function generateHeader(table, data) {
  const head = table.createTHead();
  const tr = head.insertRow();
  data.forEach(function(item, index) {
    const th = document.createElement('th');
    tr.appendChild(th);
    const txt = document.createTextNode(item);
    th.appendChild(txt);
  });
}

// Generate a row
function generateBody(table, data) {
  const body = table.createTBody();
  data.forEach(function(row, index) {
    const tr = body.insertRow();
    console.assert(row.length === 6, `row ${index}: Expect of size 6 (${row.length} instead)`);

    // Id/Icon
    const first = tr.insertCell();
    first.setAttribute('class', 'container');
    const monster_img = document.createElement('img');
    monster_img.setAttribute('src', `./assets/monster/${row[0]}.png`);
    monster_img.setAttribute('height', icon_size*2);
    monster_img.setAttribute('width', icon_size*2);
    monster_img.setAttribute('alt', `${row[1]} icon`);
    first.appendChild(monster_img);
    const id = document.createElement('div');
    id.setAttribute('class', 'id');
    id.appendChild(document.createTextNode(`No. ${row[0]}`));
    first.appendChild(id);

    // Egg
    const egg = tr.insertCell();
    egg.setAttribute('class', 'egg');
    const egg_img = document.createElement('img');
    egg_img.setAttribute('src', `./assets/egg/${row[0]}.svg`);
    egg_img.setAttribute('height', icon_size*2);
    egg_img.setAttribute('width', icon_size*2);
    egg_img.setAttribute('alt', `${row[1]} egg`);
    egg.appendChild(egg_img);

    // TODO(mizux) Add egg

    // Name
    const name = tr.insertCell();
    name.setAttribute('class', 'name');
    name.appendChild(document.createTextNode(row[1]));

    // Normal Atk
    const atk = tr.insertCell();
    atk.setAttribute('class', 'atk');
    addAtk(atk, row[2]);

    // Enraged Atk
    const enraged = tr.insertCell();
    enraged.setAttribute('class', 'atk');
    addAtk(enraged, row[3]);

    // Weapon Weakness
    const weapon = tr.insertCell();
    weapon.setAttribute('class', 'weapon');
    addWeaponWeakness(weapon, row[4]);

    // Notes
    //const note = tr.insertCell();
    //note.setAttribute('class', 'note');
    //note.appendChild(document.createTextNode(row[5]));
  });
}

// Atk stuff
// Atk assets
const power = 'power';
const power_img = document.createElement('img');
power_img.setAttribute('src', './assets/type/power.svg');
power_img.setAttribute('height', icon_size);
power_img.setAttribute('width', icon_size);
power_img.setAttribute('alt', power);

const technical = 'technical';
const technical_img = document.createElement('img');
technical_img.setAttribute('src', './assets/type/technical.svg');
technical_img.setAttribute('height', icon_size);
technical_img.setAttribute('width', icon_size);
technical_img.setAttribute('alt', technical);

const speed = 'speed';
const speed_img = document.createElement('img');
speed_img.setAttribute('src', './assets/type/speed.svg');
speed_img.setAttribute('height', icon_size);
speed_img.setAttribute('width', icon_size);
speed_img.setAttribute('alt', speed);


function addAtk(node, str) {
  if (str.includes(power)) {
    node.appendChild(power_img.cloneNode());
  }
  if (str.includes(technical)) {
    node.appendChild(technical_img.cloneNode());
  }
  if (str.includes(speed)) {
    node.appendChild(speed_img.cloneNode());
  }
}

// Weapon Stuff
// Weapon assets
const slash = 'slash';
const slash_img = document.createElement('img');
slash_img.setAttribute('src', './assets/weapon/slash.svg');
slash_img.setAttribute('height', icon_size);
slash_img.setAttribute('width', icon_size);
slash_img.setAttribute('alt', slash);
const slash_not_img = document.createElement('img');
slash_not_img.setAttribute('src', './assets/weapon/slash-not.svg');
slash_not_img.setAttribute('height', icon_size);
slash_not_img.setAttribute('width', icon_size);
slash_not_img.setAttribute('alt', slash + ' ineffective');

const pierce = 'pierce';
const pierce_img = document.createElement('img');
pierce_img.setAttribute('src', './assets/weapon/pierce.svg');
pierce_img.setAttribute('height', icon_size);
pierce_img.setAttribute('width', icon_size);
pierce_img.setAttribute('alt', pierce);
const pierce_not_img = document.createElement('img');
pierce_not_img.setAttribute('src', './assets/weapon/pierce-not.svg');
pierce_not_img.setAttribute('height', icon_size);
pierce_not_img.setAttribute('width', icon_size);
pierce_not_img.setAttribute('alt', pierce + ' ineffective');

const blunt = 'blunt';
const blunt_img = document.createElement('img');
blunt_img.setAttribute('src', './assets/weapon/blunt.svg');
blunt_img.setAttribute('height', icon_size);
blunt_img.setAttribute('width', icon_size);
blunt_img.setAttribute('alt', blunt);
const blunt_not_img = document.createElement('img');
blunt_not_img.setAttribute('src', './assets/weapon/blunt-not.svg');
blunt_not_img.setAttribute('height', icon_size);
blunt_not_img.setAttribute('width', icon_size);
blunt_not_img.setAttribute('alt', blunt + ' ineffective');

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
  if (str.includes(slash)) {
    node.appendChild(slash_img.cloneNode());
  } else {
    node.appendChild(slash_not_img.cloneNode());
  }

  if (str.includes(pierce)) {
    node.appendChild(pierce_img.cloneNode());
  } else {
    node.appendChild(pierce_not_img.cloneNode());
  }

  if (str.includes(blunt)) {
    node.appendChild(blunt_img.cloneNode());
  } else {
    node.appendChild(blunt_not_img.cloneNode());
  }
}
