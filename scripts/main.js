import generateMonsterTable from "./monster_table.js";

function redraw() {
  const node = document.getElementById("monster-div")
  node.replaceChildren(generateMonsterTable());
  //console.log(generateMonsterTable())
}

redraw();
