// Return an HTML table.
const icon_size = 32;

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
    id.appendChild(document.createTextNode(`No. ${row[0]}`));

    // Name
    const name = tr.insertCell();
    name.setAttribute('class', 'name');
    name.appendChild(document.createTextNode(row[1]));
  });
}

export default function generateTable(data) {
  const table = document.createElement('table');
  generateHeader(table, data[0]);
  generateBody(table, data.slice(1));
  console.log({table});
  return table;
}

