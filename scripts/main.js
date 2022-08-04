// Table struct
import data from "./data.js";
import generateTable from "./table.js";

function redraw() {
  document.body.appendChild(generateTable(data));
  //const node = document.getElementById("main-div")
  //node.replaceChildren(generateTable(data));
  //console.log(generateTable(data))
}

redraw();
