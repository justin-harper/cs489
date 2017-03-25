// Student name: Justin Harper
// Student ID: 10696738

/*
 *
 *   Sudoku9x9
 *
 */

function Sudoku9x9(arrOf81Values)
{
  this.cellArray2D = [];

  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(0, 9)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(9, 18)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(18, 27)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(27, 36)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(36, 45)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(45, 54)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(54, 63)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(63, 72)));
  this.cellArray2D.push(this.parseRawCol(arrOf81Values.slice(72)));
}

Sudoku9x9.prototype.parseRawCol = function (rawCol)
{
  var vals = [];
  for (var val of rawCol)
  {
    var c = new SudokuCell(9);
    c.value = val;

    if (val !== 0)
    {
      c.finalized = true;
    }

    vals.push(c)
  }
  return vals
};

Sudoku9x9.prototype.toArray = function ()
{
  var vals = [];
  for (var col of this.cellArray2D)
  {
    for (var v of col)
    {
      vals.push(v);
    }
  }
  return vals;
};

Sudoku9x9.prototype.solve = function ()
{
  var location = this.findUnassignedLocation();
  if (location.row === -1)
  {
    return {"solved": true};
  }

  for (var num = 1; num <= 9; num++)
  {
    if (this.isSafe(location.row, location.col, num))
    {
      this.cellArray2D[location.col][location.row].value = num;
      if (this.solve().solved === true)
      {
        this.cellArray2D[location.col][location.row].finalized = true;
        return {"solved": true};
      }
      else
      {
        this.cellArray2D[location.col][location.row].value = 0;
      }
    }
  }

  return {"solved": false}
};

Sudoku9x9.prototype.findUnassignedLocation = function ()
{
  for (var row = 0; row < 9; row++)
  {
    for (var col = 0; col < 9; col++)
    {
      if (this.cellArray2D[col][row].value === undefined || this.cellArray2D[col][row].value === 0)
      {
        return {"row": row, "col": col};
      }
    }
  }
  return {"row": -1, "col": -1};
};

Sudoku9x9.prototype.isSafe = function (row, col, num)
{
  return  !(this.usedInRow(row, num)) &&
          !(this.usedInCol(col, num)) &&
          !(this.usedInBox(row - row % 3, col - col % 3, num));
};

Sudoku9x9.prototype.usedInRow = function (row, num)
{
  for (var col = 0; col < 9; col++)
  {
    if (this.cellArray2D[col][row].value === num)
    {
      return true;
    }
  }
  return false;
};

Sudoku9x9.prototype.usedInCol = function (col, num)
{
  for (var row = 0; row < 9; row++)
  {
    if (this.cellArray2D[col][row].value === num)
    {
      return true;
    }
  }
  return false;
};

Sudoku9x9.prototype.usedInBox = function (boxStartRow, boxStartCol, num)
{
  for (var row = 0; row < 3; row++)
  {
    for (var col = 0; col < 3; col++)
    {
      if (this.cellArray2D[col + boxStartCol][row + boxStartRow].value === num)
      {
        return true;
      }
    }
  }
  return false;
};

/*
 *
 *   SudokuCell
 *
 */

function SudokuCell(numPossibleValues)
{
  var Ivalue = undefined;
  var finalized = false;
  Object.defineProperty(this, "value",
                        {
                          enumerable: true,
                          get: function ()
                          {
                            return this.Ivalue;
                          },
                          set: function (val)
                          {
                            this.Ivalue = val;
                          }
                        });
}

SudokuCell.prototype.toString = function ()
{
  if (this.value === undefined)
  {
    return "0";
  }
  else
  {
    return this.value.toString();
  }
};

