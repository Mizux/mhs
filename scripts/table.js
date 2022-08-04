// Return an HTML table.
const icon_size = 32;

// Atk type
const power = 'power';
const power_img = document.createElement('img');
power_img.setAttribute('src', 'img/power.png');
power_img.setAttribute('height', icon_size);
power_img.setAttribute('width', icon_size);
power_img.setAttribute('alt', power);

const technical = 'technical';
const technical_img = document.createElement('img');
technical_img.setAttribute('src', './img/technical.png');
technical_img.setAttribute('height', icon_size);
technical_img.setAttribute('width', icon_size);
technical_img.setAttribute('alt', technical);

const speed = 'speed';
const speed_img = document.createElement('img');
speed_img.setAttribute('src', './img/speed.png');
speed_img.setAttribute('height', icon_size);
speed_img.setAttribute('width', icon_size);
speed_img.setAttribute('alt', speed);

// Weapon type
const slash = 'slash';
const slash_img = document.createElement('img');
slash_img.setAttribute('src', 'img/slash.png');
slash_img.setAttribute('height', icon_size);
slash_img.setAttribute('width', icon_size);
slash_img.setAttribute('alt', slash);

const pierce = 'pierce';
const pierce_img = document.createElement('img');
pierce_img.setAttribute('src', './img/pierce.png');
pierce_img.setAttribute('height', icon_size);
pierce_img.setAttribute('width', icon_size);
pierce_img.setAttribute('alt', pierce);

const blunt = 'blunt';
const blunt_img = document.createElement('img');
blunt_img.setAttribute('src', './img/blunt.png');
blunt_img.setAttribute('height', icon_size);
blunt_img.setAttribute('width', icon_size);
blunt_img.setAttribute('alt', blunt);

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
    // Id
    const id = tr.insertCell();
    id.setAttribute('class', 'id');
    id.appendChild(document.createTextNode(`No. ${row[0]}`));

    // Logo
    const logo = tr.insertCell();
    logo.setAttribute('class', 'logo');
    const img = document.createElement('img');
    img.setAttribute('src', `./img/${row[0]}.png`);
    img.setAttribute('height', icon_size*2);
    img.setAttribute('width', icon_size*2);
    img.setAttribute('alt', blunt);
    logo.appendChild(img);

    // Name
    const name = tr.insertCell();
    name.setAttribute('class', 'name');
    name.appendChild(document.createTextNode(row[1]));

    // Atk
    const atk = tr.insertCell();
    atk.setAttribute('class', 'atk');
    addAtk(atk, row[2]);

    // Special
    const spe = tr.insertCell();
    spe.setAttribute('class', 'atk');
    addAtk(spe, row[3]);

    // Weapon Weakness
    const weapon = tr.insertCell();
    weapon.setAttribute('class', 'weapon');
    addWeakness(weapon, row[4]);

    // Notes
    const note = tr.insertCell();
    note.setAttribute('class', 'note');
    note.appendChild(document.createTextNode(row[5]));
  });
}

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

function addWeakness(node ,str) {
  if (str.includes(slash)) {
    node.appendChild(slash_img.cloneNode());
  }
  if (str.includes(pierce)) {
    node.appendChild(pierce_img.cloneNode());
  }
  if (str.includes(blunt)) {
    node.appendChild(blunt_img.cloneNode());
  }
}
