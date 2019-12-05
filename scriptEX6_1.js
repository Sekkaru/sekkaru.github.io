let hod = 0;
let WinCriteria = 3;
function CreateTable(){
	let myTable = document.getElementById("iTable");
	let filed_size = document.getElementById("filed_size").value;
	let x = filed_size;
	let y = filed_size;
	myTable.innerHTML = "";

	for (let i=0; i<x; ++i){
		let newTableLine = document.createElement("tr");
		for (let j=0; j<y; ++j){
			let newTableCell = document.createElement("td");
			newTableCell.setAttribute("id","cell_"+(i+1)+"_"+(j+1));
			newTableCell.cellStatus = "0";
			newTableCell.addEventListener("mousedown",cellMouseDown);
			newTableLine.appendChild(newTableCell);
		}
		myTable.appendChild(newTableLine);
	}
}

function cellMouseDown(e){
	e = e || window.event;
	let el = e.target || e.srcElement;
    let index1 = el.closest("tr").rowIndex;
    let index2 = el.closest("td").cellIndex;
	switch(e.which){
		case 1:
			if (this.style.backgroundImage == ""){
				this.style.backgroundImage = "url(Nol.png)";
				this.cellStatus = "1";
				hod++;
				CheckWin (index1, index2, this.cellStatus);
			}
			break;
		case 3:
			if (this.style.backgroundImage == ""){
				this.style.backgroundImage = "url(Krest.png)";
				this.cellStatus = "2";
				hod++;
				CheckWin (index1, index2, this.cellStatus);
			}
			break;
	}
}

function CheckWin(row, cell, typeField) {
    let horizont = 1 + ChecDirection(row, cell, typeField, 0, -1) + ChecDirection(row, cell, typeField, 0, 1);
    let vertical = 1 + ChecDirection(row, cell, typeField, -1, 0) + ChecDirection(row, cell, typeField, 1, 0);
    let diagonalReducing = 1 + ChecDirection(row, cell, typeField, -1, -1) + ChecDirection(row, cell, typeField, 1, 1);
    let diagonalIncreasing = 1 + ChecDirection(row, cell, typeField, -1, 1) + ChecDirection(row, cell, typeField, 1, -1);   
     if (horizont >= WinCriteria || vertical >= WinCriteria || diagonalReducing >= WinCriteria || diagonalIncreasing >= WinCriteria) {
        if (typeField == "2")
            document.getElementById("Cross").innerHTML = "Победии Нолики";
        else if (typeField == "1")
            document.getElementById("Cross").innerHTML = "Победили Крестики";
    }
    else if (CheckDrow())
        document.getElementById("Cross").innerHTML = "Ничья";
}
function ChecDirection(row, cell, typeField, directionRow, directionCell) {
    let currentRow = row + directionRow;
    let currentCell = cell + directionCell;
    let id = "cell_" + (currentRow + 1) + "_" + (currentCell + 1);
    let myCell = document.getElementById(id);
      if (myCell != null && typeField == myCell.cellStatus) {
        return 1 + ChecDirection(currentRow, currentCell, typeField, directionRow, directionCell);
    }
    return 0;
}

function CheckDrow()
{
    let myCells = document.querySelectorAll('td');
    let cellsNumber = myCells.length;
    for(let i=0; i<cellsNumber; ++i)
    {
        if(myCells[i].cellStatus == 0)
            return false;
    }
    return true;
        
}
