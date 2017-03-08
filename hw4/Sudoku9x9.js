// Student name: Justin Harper
// Student ID: 10696738


function Sudoku9x9(arrOf81Values)
{

}

Sudoku9x9.prototype.get3x3 = function(rowIndex, collIndex)
{

};

Sudoku9x9.prototype.getColumn = function(collIndex)
{

};

Sudoku9x9.prototype.getRow = function(rowIndex)
{

};

Sudoku9x9.prototype.toArray = function()
{

};



function SudokuCell(numPossibleValues)
{
    this.finalizedValue = null;
}

SudokuCell.prototype.containsPossibliity = function(value)
{

};

SudokuCell.prototype.getPossibilities = function()
{

};

SudokuCell.prototype.isFinalized = function()
{

};

SudokuCell.prototype.removePossibility = function(value)
{

};

SudokuCell.prototype.removePossibilities = function()
{

};

SudokuCell.prototype.toString = function()
{

};


function SudokuCellCollection(arrOfCells)
{
  var length;
}

SudokuCellCollection.prototype.containsCell = function(value)
{

};

SudokuCellCollection.prototype.containsPossibliity = function(value)
{

};

SudokuCellCollection.prototype.count = function(predicate)
{

};

SudokuCellCollection.prototype.forEach = function(functionThatTakes1CellParam, startIndex)
{

};

SudokuCellCollection.prototype.getFinalizedValues = function()
{

};

SudokuCellCollection.prototype.getPossibilities = function()
{

};

SudokuCellCollection.prototype.removeCell = function(cell)
{

};

SudokuCellCollection.prototype.removeCells = function(otherCellCollection)
{

};

SudokuCellCollection.prototype.removePossibility = function(value)
{

};


function SudokuCellBlock(arrOf9Values)
{
  SudokuCellCollection.call(this, arrOf9Values);
}
SudokuCellBlock.prototype = Object.create(SudokuCellCollection.prototype);

SudokuCellBlock.prototype.trySolve = function()
{

};


function Sudoku3x3Block(arrOf9Values)
{
  SudokuCellBlock.call(this, arrOf9Values)
}
Sudoku3x3Block.prototype = Object.create(SudokuCellBlock.prototype);

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnColumn = function(collIndex)
{

};

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnRow = function(rowIndex)
{

};

Sudoku3x3Block.prototype.isColumnFinalized = function(columnIndex)
{

};

Sudoku3x3Block.prototype.isRowFinalized = function(rowIndex)
{

};

Sudoku3x3Block.prototype.toString = function()
{

};
