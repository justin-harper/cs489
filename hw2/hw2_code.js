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
    if(current > value)
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
  if(current === undefined)
  {
    current = this.m_root;
  }
  if(current == null)
  {
    return null;
  }
  while(current.right != null)
  {
    current = current.right;
  }

  return current;
}

BST.prototype.getMin = function(current)
{
  if(current === undefined)
  {
    current = this.m_root;
  }
  if(current == null)
  {
    return null;
  }
  while(current.left != null)
  {
    current = current.left;
  }
  return current;
};

BST.prototype.has = function(value)
{
  if(this.getLevel(value) >= 0)
  {
    return true;
  }
  else
  {
    return false;
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
  if(this.m_root == null)
  {
    return false;
  }

  if(this.m_root.value != value)
  {
    return false;
  }

  //m_root.value == value...need to remove the root node
  //same rules apply we just need to update m_root when we are done

  if(this.m_root.left === null && this.m_root.right === null)
  {
    //no children remove from linked list
    this.removeFromLinkedList(this.m_root);
    //just set m_root to null
    this.m_root = null;
    return true;
  }
  //we have atleast 1 child
  if(this.m_root.right === null)
  {
    //only have left child
    //need to get max of left sub tree
    var tmp = getMax(this.m_root.left);

    //remove tmp from tree (leaf node)
    tmp.parent.right = null;

    //m_root.parrent = null so make tmp.parent null
    tmp.parent = null;

    //m_root.right is null so we don't have to worry about that
    //make tmp.left -> m_root.left
    tmp.left = this.m_root.left;
    if(tmp.left !== null)
    {
      tmp.left.parent = tmp;
    }


    removeFromLinkedList(this.m_root);
    this.m_root = tmp;
    return true;
  }
  else
  {
    //we have a right child and maybe a left child
    //get min of right sub tree

    var tmp = this.getMin(this.m_root.right);

    //remove tmp from tree(leaf)
    tmp.parent.left = null;

    //set tmp.parent to null
    tmp.parent = null;

    tmp.right = this.m_root.right;
    if(tmp.right != null)
    {
      tmp.right.parent = tmp;
    }
    //need to allow for the left subtree not being null...
    //because of bst m_root.left < tmp.min
    var tmp2 = this.getMin(tmp.right);
    tmp2.left = this.m_root.left;

    this.removeFromLinkedList(this.m_root);
    this.m_root = tmp;
    return true;
  }
  console.log("removeRoot(): HIT!!");
  return false; //?
}

BST.prototype.remove = function(value)
{
  if(this.m_root == null)
  {
    return false;
  }

  if(this.removeRoot(value) == true)
  {
    return true;
  }

  var current = this.m_root;
  while(current != null)
  {
    if(value < current.value)
    {
      current = current.left;
    }
    else if(value > current.value)
    {
      current = current.right;
    }
    else
    {
      //remove this node
      return this.removeThisNode(current);
    }
  }
  return false;
}

BST.prototype.removeThisNode = function(current)
{
  //current is the node we are removing
  if(current.left === null && current.right === null)
  {
    //current is a leaf...set parent->current to null
    if(current == current.parent.right)
    {
      current.parent.right = null;
    }
    else
    {
      current.parent.left = null;
    }
    //we are done
    this.removeFromLinkedList(current);
    return true;
  }
  //we have atleast 1 child
  if(current.right === null)
  {
    //only left exists
    //need to get max of left sub tree
    var tmp = this.getMax(current.left);

    //remove tmp from tree (it is a leaf)
    tmp.parent.right = null;

    //set tmp's parent ptr
    tmp.parent = current.parent;

    /***************
    need to make tmp.left/right point to something....lol
    ***************/

    tmp.left = current.left;
    if(tmp.left !== null)
    {
      tmp.left.parent = tmp;
    }

    //make parent->current point to tmp instead
    if(current == current.parent.right)
    {
      current.parent.right = tmp;
    }
    else
    {
      current.parent.left = tmp;
    }
    this.removeFromLinkedList(current);
    return true;
  }
  else
  {
    //we have a right child

    //get min of right sub tree
    var tmp = this.getMin(current.right);

    //remove tmp from tree (leaf)
    tmp.parent.left = null;

    //set tmp's parrent ptr
    tmp.parent = current.parent;

    if(current == current.parent.right)
    {
      current.parent.right = tmp;
    }
    else
    {
      current.parent.left = tmp;
    }
    //NEED TO FIX UP PARRENT.LEFT PARRENT.RIGHT other wise
    //we lose the rest of the tree

    var tmp2 = this.getMin(tmp.right);
    tmp2.left = current.left;


    this.removeFromLinkedList(current);
    return true;
  }
  console.log("removeThisNode(): hit!");
  return false;
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
}

BST.prototype.forEach = function()
{
  // body...
};

// and more of your code down here
