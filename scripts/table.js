// Return a HTML table.

function generateHeader(table, data) {
  const head = table.createTHead();
  const tr = head.insertRow();
  data.forEach(function(item) {
    const td = tr.insertCell();
    const txt = document.createTextNode(item);
    td.appendChild(txt);
  }
  );
}

function generateBody(table, data) {
  const body = table.createTBody();
  data.forEach(function(row) {
    const tr = body.insertRow();
    row.forEach(function(item) {
      const td = tr.insertCell();
      const txt = document.createTextNode(item);
      td.appendChild(txt);
    });
  });
}

export default function generateTable(data) {
  const table = document.createElement('table');
  generateHeader(table, data[0]);
  generateBody(table, data.slice(1));
  console.log({table});
  return table;
}

