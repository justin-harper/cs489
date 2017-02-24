// Student name: Justin Harper
// Student ID: 10696738

function BST(compareFunction)
{
    this.m_root = null;
    this.m_first = null;
    this.m_last = null;
}

function NODE(value)
{
  this.value    = value;
  this.left     = null;
  this.right    = null;
  this.parent  = null;
  this.next     = null;
  this.previous = null;
}

BST.prototype.compare = function(first, seccond)
{
  if(first.value < seccond.value)
  {
    return -1;
  }
  else if(first.value > seccond.value)
  {
    return 1;
  }
  return 0;
};

BST.prototype.add = function(newValue)
{
  if(this.m_root == null)
  {
    this.m_root = new NODE(newValue);
    this.m_first = this.m_root;
    this.m_last = this.m_root;
    return true;
  }
  else
  {
    var current = this.m_root;
    var parent = current;

    while(current != null)
    {

      if(current.value == newValue)
      {
        return false;
      }
      else if(current.value > newValue)
      {
        parent = current;
        current = current.left;
        if(current == null)
        {
          current = new NODE(newValue);
          parent.left = current;
          current.parent = parent;
          this.m_last.next = current;
          current.previous = this.m_last;
          this.m_last = current;
          return true;
        }
      }
      else
      {
        parent = current;
        current = current.right;
        if(current == null)
        {
          current = new NODE(newValue);
          parent.right = current;
          current.parent = parent;
          this.m_last.next = current;
          current.previous = this.m_last;
          this.m_last = current;
          return true;
        }

      }
    }

  }
  console.log("BST.add(): Um..not supposed to be here " + newValue );
  return false;

};

BST.prototype.addMultiple = function(arrOfValues)
{
  var count = 0;

  for(var i = 0; i < arrOfValues.length; i++)
  {
    if(this.add(arrOfValues[i]) === true)
    {
      count++;
    }
  }

  return count;
};

BST.prototype.clear = function()
{
  this.m_root = null;
  this.m_first = null;
  this.m_last = null;
};

BST.prototype.countLevels = function(current)
{
  if(current === undefined)
  {
    current = this.m_root;
    if(current === null)
    {
      return -1;
    }
  }
  if(current === null)
  {
    return 0;
  }
  if(current.left === null && current.right === null)
  {
    return 1;
  }

  return this.max(this.countLevels(current.left), this.countLevels(current.right)) + 1;
}

BST.prototype.max = function(val1, val2)
{
  return val1 > val2? val1 : val2;
}




BST.prototype.count = function()
{
  var i = 0;
  var current = this.m_first;
  while(current!= null)
  {
    current = current.next;
    i++;
  }

  return i;
};

BST.prototype.getLevel = function(value)
{
  if(this.m_root == null)
  {
    return -1;
  }
  if(this.m_root.value == value)
  {
    return 0;
  }
  var i = 0;
  var current = this.m_root;
  while(current != null)
  {
    if(current.value == value)
    {
      return i;
    }
    if(current.value > value)
    {
      current = current.left;
      i++;
    }
    else
    {
      current = current.right
      i++;
    }
  }
  return -1;
};

BST.prototype.getMax = function(current)
{
  var x = false;
  if(current === undefined)
  {
    current = this.m_root;
    x = true;
  }

  while(current.right != null)
  {
    current = current.right;
  }
  if(x == true)
  {
    return current.value;
  }

  return current;
};

BST.prototype.getMin = function(current)
{
  var x = false;
  if(current === undefined)
  {
    current = this.m_root;
    x = true;
  }

  while(current.left != null)
  {
    current = current.left;
  }
  if(x == true)
  {
    return current.value;
  }
  return current;
};

BST.prototype.has = function(value, current)
{
  if(current === undefined)
  {
    current = this.m_root;
  }
  if(current === null)
  {
    return false;
  }
  if(current.value == value)
  {
    return true;
  }
  if(value < current.value)
  {
    return this.has(value, current.left);
  }
  else
  {
    return this.has(value, current.right);
  }
};



BST.prototype.toString = function(delimiter, current)
{
  if(delimiter === undefined)
  {
    delimiter = " ";
  }
  if(current === undefined)
  {
    current = this.m_root;
  }

  if(current == null)
  {
    return "";
  }
  var s = ""
    s += this.toString(delimiter, current.left) + delimiter;
    s += current.value + delimiter
    s += this.toString(delimiter, current.right) + delimiter;
    return s.trim();
};

BST.prototype.removeRoot = function(value)
{
  if(this.m_root === null)
  {
    return false;
  }
  if(this.m_root.value === value)
  {
    var tmp;
    if(this.m_root.right !== null)
    {
      tmp = this.getMin(this.m_root.right);
      tmp.left = this.m_root.left;
      tmp.left.parent = tmp;
      tmp.parent.left = null;
      tmp.parent = null;

      if(tmp !== this.m_root.right)
      {
        tmp.right = this.m_root.right
      }

      this.removeFromLinkedList(this.m_root);
      this.m_root = tmp;
      return true;
    }
    //this.m_root.right is empty
    this.removeFromLinkedList(this.m_root);
    this.m_root = this.m_root.left;
    if(this.m_root !== null)
    {
      this.m_root.parent = null;
    }
    return true;
  }
  return false;
};

BST.prototype.remove = function(value)
{
  if(this.m_root === null)
  {
    return false;
  }
  if(this.removeRoot(value) == true)
  {
    return true;
  }
  var current = this.m_root;
  while(current !== null)
  {
    if(current.value == value)
    {
      // console.log("removing " + value)
      // console.log(this.m_root);
      this.removeMe(current);
      return true;
    }
    else if(value < current.value)
    {
      current = current.left;
    }
    else
    {
      current = current.right
    }
  }

  return false;
};

BST.prototype.removeMe = function(current)
{
  if(current.right === null)
  {
    return this.removeNoRight(current);
  }
  else if(current.left === null)
  {
    return this.removeNoLeft(current);
  }
  else
  {
    return this.removeWithBothChildren(current);
  }
};

BST.prototype.removeWithBothChildren = function(current)
{
  //               x
  //             /   \
  //            A     B
  //           / \   / \
  //          1   2 3   4
  //
  //
  //
  //              want
  //               B
  //             /   \
  //            3     4
  //           /
  //          A
  //         / \
  //        1   2


  // current = x

  var A = current.left;
  var B = current.right;
  if(B.left === null)
  {
    //3 is null
    B.left = A;
  }
  else
  {
    var C = this.getMin(B.left); //C = min of 3
    C.left = A;
  }

  if(current.value < current.parent)
  {
    current.parent.left = B;
    B.parent = current.parent;
    this.removeFromLinkedList(current);
  }
  else
  {
    current.parent.right = B;
    B.parent = current.parent;
    this.removeFromLinkedList(current);
  }




}

BST.prototype.removeNoLeft = function(current)
{
  //current.right !== null
  if(current.value > current.parent.value)
  {
    //we are on the right of parrent and we have no left
    current.parent.right = current.right;
    if(current.right !== null)
    {
      current.right.parent = current.parent;
    }
    this.removeFromLinkedList(current);
    return true;
  }
  else
  {
    //we are on the left and we have no left
    current.parent.left = current.right;
    if(current.right !== null)
    {
      current.right.parent = current.parent;
    }
    this.removeFromLinkedList(current);
    return true;
  }

}

BST.prototype.removeNoRight = function(current)
{
  if(current.value > current.parent.value)
    {
      //we are on the right side and we have no right
      current.parent.right = current.left;
      if(current.left !== null)
      {
        current.left.parent = current.parent;
      }
      this.removeFromLinkedList(current);
      return true;

      //current.right === null so we are done here
    }
    else
    {
      //we are on the left side
      current.parent.left = current.left;
      if(current.left !== null)
      {
        current.left.parent = current.parent;
      }
      this.removeFromLinkedList(current);
      return true;
    }
}

BST.prototype.removeFromLinkedList = function(current)
{
  if(this.m_first == current)
  {
    this.m_first = current.next;
  }
  if(this.m_last == current)
  {
    this.m_last = current.previous;
  }
  if(current.previous != null)
  {
    current.previous.next = current.next;
  }
  if(current.next != null)
  {
    current.next.previous = current.previous;
  }
};

BST.prototype.forEach = function(callback, useInsertionOrder, current)
{
  if(useInsertionOrder === true)
  {
    var c = this.m_first;
    while(c !== null)
    {
      callback.call(this, c.value, this.m_root);
      c = c.next;
    }
  }
  else
  {
    if(current === undefined)
    {
      current = this.m_root;
    }
    if(current === undefined)
    {
      return;
    }
    if(current !== null)
    {
      this.forEach(callback, useInsertionOrder, current.left);
      callback.call(this, current.value, this.m_root);
      this.forEach(callback, useInsertionOrder, current.right);
    }
  }
};

// and more of your code down here
