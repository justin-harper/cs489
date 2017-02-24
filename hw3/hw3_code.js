// Student name: Justin Harper
// Student ID: 10696738

// Don't forget to include the .js file for the base class along with
// this one when submitting to Blackboard!

function Set489(compareFunction)
{
    // your code here
  BST.call(this, compareFunction);
}
Set489.prototype = Object.create(BST.prototype);



Set489.prototype.add = function(value)
{
  BST.prototype.add.call(this, value);
};

Set489.prototype.remove = function(value)
{

};



Set489.prototype.forEach = function(callback, useInsertionOrder)
{
  return BST.forEach.call(callback, useInsertionOrder);
};

// and more of your code down here
