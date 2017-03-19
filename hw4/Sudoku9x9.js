// Student name: Justin Harper
// Student ID: 10696738

/*
*
*   Sudoku9x9
*
*/

function Sudoku9x9(arrOf81Values)
{
  this.cellArray2D = new Array();
  this.cells = [
                arrOf81Values.slice(0,9),
                arrOf81Values.slice(9,18),
                arrOf81Values.slice(18,27),
                arrOf81Values.slice(27,36),
                arrOf81Values.slice(36,45),
                arrOf81Values.slice(45,54),
                arrOf81Values.slice(54,63),
                arrOf81Values.slice(63,72),
                arrOf81Values.slice(72)
              ];
}

Sudoku9x9.prototype.toArray = function()
{
  return this.cellArray2D;
};

Sudoku9x9.prototype.getRow = function(row_Index)
{
  var cellArray = new Array();
  for(var i = 0; i < 9; i++)
  {
    cellArray.push(cells[row_Index][i]);
  }
  return new SudokuCellBlock(cellArray);
};

Sudoku9x9.prototype.getColumn = function(column_Index)
{
  var cellArray = new Array();
  for(var i = 0; i < 9; i++)
  {
    cellArray.push(cells[i][column_Index]);
  }
  return new SudokuCellBlock(cellArray);
};

Sudoku9x9.prototype.get3x3 = function(row_Index, column_Index)
{
  var row       = row_Index * 3;
  var column    = column_Index * 3
  var cellArray = new Array();

  for(var i = 0; i < 3; i++)
  {
    for(var j = 0; j < 3; j++)
    {
      cellArray.push(this.cells[row + i][column + j]);
    }
  }
  return new Sudoku3x3Block(cellArray);
};

/*
*
*   SudokuCell
*
*/

function SudokuCell(numPossibleValues)
{

  var finalizedValue = 0;
  var isFinalized = false;

  this.possibleValues = new Array();

  for(var i = 1; i <= numPossibleValues; i++)
  {
    this.possibleValues.push(i);
  }

  var getFinalizedValue = function()
  {
    if(!isFinalized)
    {
      return undefined;
    }
    return finalizedValue;
  }

  var setFinalizedValue = function(value)
  {
    isFinalized = true;
    finalizedValue = value;
    this.possibleValues = new Array();
    this.possibleValues.push(value);
  }

  var getIsFinalized = function()
  {
    return isFinalized;
  }

  Object.defineProperty(this, "finalizedValue",
                        {
                          enumerable: true,
                          get: getFinalizedValue,
                          set: setFinalizedValue
                        });
  Object.defineProperty(this, "isFinalized",
                        {
                          enumerable: true,
                          get: getIsFinalized
                        });
}

SudokuCell.prototype.getPossibilities = function()
{
  this.possibleValues.sort();
  return this.possibleValues;
};


SudokuCell.prototype.removePossibilities = function(arrOfValues)
{
  for(var v of arrOfValues)
  {
    this.removePossibility(v);
  }
};

SudokuCell.prototype.removePossibility = function(value)
{
  if(this.isFinalized)
  {
    return false;
  }

  var index = this.possibleValues.indexOf(value);
  if(index > -1)
  {
    this.possibleValues.splice(index, 1);
    if(this.possibleValues.length === 1)
    {
      this.finalizedValue = this.possibleValues[0];
    }
    return true;
  }
  return false;
};

SudokuCell.prototype.containsPossibility = function(value)
{
  return this.possibleValues.indexOf(value) > -1;
};

SudokuCell.prototype.toString = function()
{
  return this.getPossibilities().join();
};

/*
*
*   SudokuCellCollection
*
*/

function SudokuCellCollection(arrOfCells)
{
	this.complimentPossibilities = function(possibilities)
  {
		var new_possibilities = [1,2,3,4,5,6,7,8,9];
		for(var p of possibilities)
    {
			var index = new_possibilities.indexOf(p);
			if(index > -1)
      {
        new_possibilities.splice(index, 1);
      }
		}
		return new_possibilities;
	};

	this.cells = new Array();
	if(arrOfCells !== undefined && arrOfCells !== null)
  {
		for(var cell of arrOfCells)
    {
			if(!cell) continue;
      {
        this.cells.push(cell);
      }
		}
	}

	var getLength = function()
  {
		var count = 0;
		for(var cell of this.allCells())
    {
			if(cell)
      {
        count++;
      }
		}
		return count;
	}
	Object.defineProperty(this, "length",
                        {
                          enumberable: true,
                          configurable: false,
                          get: getLength
                        });
}

SudokuCellCollection.prototype.removePossibility = function(value)
{
  var removeCount = 0;
  for(cell of this.cells)
  {
    if(cell.removePossibility(value))
    {
      removeCount++;
    }
  }
  return removeCount;
};

SudokuCellCollection.prototype.removeCells = function(otherCellCollection)
{
  if(!(otherCellCollection instanceof SudokuCellCollection))
  {
    return this;
  }
  var cellArray = new Array();
  for(var cell of this.cells)
  {
    if(!otherCellCollection.contains(cell))
    {
      cellArray.push(cell);
    }
  }
  return new SudokuCellCollection(cellArray);
};

SudokuCellCollection.prototype.removeCell = function(cell)
{
  var cellArray = new Array();
  for(var arrayCell of this.cells)
  {
    if(arrayCell !== cell)
    {
      cellArray.push(arrayCell);
    }
  }
  return new SudokuCellCollection(cellArray);
};

SudokuCellCollection.prototype.getPossibilities = function()
{
  var totalPossibilities = new Array();
  for(var cell of this.allCells())
  {
    if(cell.isFinalized)
    {
      continue;
    }
    var possibilities = cell.getPossibilities();

    for(var p of possibilities)
    {
      if(totalPossibilities.indexOf(p) < 0)
      {
        totalPossibilities.push(p);
      }
    }
  }
  total_possibilities.sort();
  return total_possibilities;
};

SudokuCellCollection.prototype.getFinalizedValues = function()
{
  var finalVals = new Array();

  for(var c of this.allCells())
  {
    if(c.finalizedValue)
    {
      finalVals.push(c.finalizedValue)
    }
  }
  return finalVals;
};

SudokuCellCollection.prototype.allCells = function()
{
  return this.cells;
};

SudokuCellCollection.prototype.containsCell = function(cell)
{
	for(var cell of this.cells)
  {
		if(cell === cell)
    {
      return true;
    }
	}
	return false;
};

SudokuCellCollection.prototype.containsPossibility = function(value)
{
	for(var c of this.cells)
  {
		if(c.containsPossibility(value))
    {
      return true;
    }
	}
	return false;
};

SudokuCellCollection.prototype.count = function(predicate)
{
	var count = 0;
	for(var c of this.cells)
  {
		if (predicate(c))
    {
      count++;
    }
	}
	return count;
};

SudokuCellCollection.prototype.forEach = function(functionThatTakes1CellParam, startIndex)
{
	var start = startIndex ? startIndex : 0;
	var cells = this.allCells();
	for(var i = start; i < cells.length; i++)
  {
		functionThatTakes1CellParam(cells[i]);
	}
};

/*
*
*   SudokuCellBlock
*
*/

function SudokuCellBlock(arrOf9Values)
{
  SudokuCellCollection.call(this, arrOf9Values);
}
SudokuCellBlock.prototype = Object.create(SudokuCellCollection.prototype);

SudokuCellBlock.prototype.GetAllExecptCell = function(cell)
{
  var cellArray = new Array();
  for(var c of this.allCells())
  {
    if(c !== cell)
    {
      cellArray.push(c);
    }
  }
  return cellArray;
};

SudokuCellBlock.prototype.trySolve = function()
{
  var stat =
  {
    changed: false,
     solved: true
  };
  var cells = this.allCells();
  for(var c of cells)
  {
    if(!c.isFinalized)
    {
      var column = new SudokuCellCollection(this.GetAllExecptCell(c));
      for(var p of c.getPossibilities())
      {
        if(!column.containsPossibility(p))
        {
          c.finalizedValue = p;
          stat.changed = true;
          break;
        }
      }
      continue;
    }
    for(var uc of this.GetAllExecptCell(c))
    {
      if(uc.removePossibility(c.finalizedValue))
      {
        stat.changed = true;
      }
    }
  }
  for(var c of cells)
  {
    if(!c.isFinalized)
    {
      stat.solved = false;
      break;
    }
  }
  return stat;
};

/*
*
*   Sudoku3x3Block
*
*/

function Sudoku3x3Block(arrOf9Values)
{
  SudokuCellBlock.call(this, arrOf9Values);
  this.cells =
  [
    arrOf9Values.slice(0,3),
    arrOf9Values.slice(3,6),
    arrOf9Values.slice(6)
  ];
}
Sudoku3x3Block.prototype = Object.create(SudokuCellBlock.prototype);

Sudoku3x3Block.prototype.allCells = function()
{
  var cellArray = new Array();
  for(var column of this.cells)
  {
    for(var cell of column)
    {
      cellArray.push(cell);
    }
  }
  return cellArray;
};

Sudoku3x3Block.prototype.getRowString = function(row_Index)
{
  var row_string = "";
  if(this.cells[row_Index][0].isFinalized)
  {
    row_string += this.cells[row_Index][0].finalizedValue.toString();
  }
  else
  {
    row_string += "X";
  }
  if(this.cells[row_Index][1].isFinalized)
  {
    row_string += this.cells[row_Index][1].finalizedValue.toString();
  }
  else
  {
    row_string += "X";
  }
  if(this.cells[row_Index][2].isFinalized)
  {
    row_string += this.cells[row_Index][2].finalizedValue.toString();
  }
  else
  {
    row_string += "X";
  }
  return row_string;
};

Sudoku3x3Block.prototype.toString = function()
{
  var first_line    = this.getRowString(0);
  var secound_line  = this.getRowString(1);
  var third_line    = this.getRowString(2);
  return first_line + "\n" + secound_line + "\n" + third_line + "\n";
};

Sudoku3x3Block.prototype.isColumnFinalized = function(columnIndex)
{
  for(var i = 0; i < 3; i++)
  {
    if(!this.cells[i][columnIndex].isFinalized)
    {
      return false;
    }
  }
  return true;
};

Sudoku3x3Block.prototype.isRowFinalized = function(row_Index)
{
  for(var i = 0; i < 3; i++)
  {
    if(!this.cells[row_Index][i].isFinalized)
    {
      return false;
    }
  }
  return true;
};

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnRow = function(row_Index)
{
  var possibilities = new Array();
  for(var i = 0; i < 3; i++)
  {
    var cell = this.cells[row_Index][i];
    for(var possibility of cell.getPossibilities())
    {
      if(possibilities.indexOf(possibility) < 0)
      {
        possibilities.push(possibility);
      }
    }
  }
  return total_possibilities;
};

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnColumn = function(column_Index)
{
  var possibilities = new Array();
  for(var i = 0; i < 3; i++)
  {
    var cell = this.cells[i][column_Index];
    for(var possibility of cell.getPossibilities())
    {
      if(possibilities.indexOf(possibility) < 0)
      {
        possibilities.push(possibility);
      }
    }
  }
  return total_possibilities;
};
