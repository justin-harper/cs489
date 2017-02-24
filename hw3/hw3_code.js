// Student name: Justin Harper
// Student ID: 10696738

// Don't forget to include the .js file for the base class along with
// this one when submitting to Blackboard!

function Set489(compareFunction)
{
    // your code here
  BST.call(this, compareFunction);
  var BLACK = 'black';
  var RED = 'red';
};

Set489.prototype = Object.create(BST.prototype);


Set489.prototype.find = function(value)
{
  var current = this.m_root;
  while(current != null)
  {
    if(current.value === value)
    {
      return current;
    }
    else if(current.value < value)
    {
      current = current.left;
    }
    else
    {
      current = current.right;
    }
  }

  return current;
};


Set489.prototype.GetGrandParent = function(node)
{
  if(node.parent === null)
  {
    return null;
  }
  return node.parent.parent;
};

Set489.prototype.GetSibling = function(node)
{
  if(this.parent === null)
  {
    return null;
  }
  return node === node.parent.left ? node.parent.right : node.parent.left;
};

Set489.prototype.GetUncle = function(node)
{
  if(this.parent === null)
  {
    return null;
  }
  return this.GetSibling(node.parent);
};

Set489.prototype.SwapNode = function(replaceMe, withMe)
{
  if(replaceMe.parent === null)
  {
    this.m_root = withMe;
  }
  else
  {
    if(replaceMe === replaceMe.parent.left)
    {
      replaceMe.parent.left = withMe;
    }
    else
    {
      replaceMe.parent.right = withMe;
    }
    if(withMe !== null)
    {
      withMe.parent = replaceMe.parent;
    }
  }
};

Set489.prototype.RotateLeft = function(node)
{
  var right = node.right;
  this.SwapNode(node, right);

  node.right = right.left;
  if(right.left !== null)
  {
    right.left.parent = node;
  }
  node.parent = right;
};

Set489.prototype.RotateRight = function(node)
{
  var left = node.left;
  this.SwapNode(node, left);

  node.left = left.right;
  if(left.right !== null)
  {
    left.right.parent = node;
  }
  left.right = node;
  node.parent = left;
};

Set489.prototype.InsertCase1 = function(node)
{
  node.color = this.BLACK;
};

Set489.prototype.InsertCase2 = function(node)
{
  if(this.GetNodeColor(node) === this.BLACK)
  {
    return;
  }
  this.InsertCase3(node);
};

Set489.prototype.InsertCase3 = function(node)
{
  var Uncle = this.GetUncle(node);
  var GrandParent = this.GetGrandParent(node);

  if(Uncle !== null && this.GetNodeColor(Uncle) === this.RED)
  {
    node.parent.color = this.BLACK;
    Uncle.color = this.BLACK;
    GrandParent.color = this.RED;
    this.InsertCase1(GrandParent);
  }
  else
  {
    this.InsertCase4(node);
  }
};

Set489.prototype.InsertCase4 = function(node)
{
  var GrandParent = this.GetGrandParent(node);

  if(node === node.parent.right && node.parent === GrandParent.left)
  {
    this.RotateLeft(node.parent);
    node = node.left;
  }
  else if(node === node.parent.left && node.parent === GrandParent.right)
  {
    this.RotateRight(node.parent);
    node = node.right;
  }

  this.InsertCase5(node);
}

Set489.prototype.InsertCase5 = function(node)
{
  var GrandParent = this.GetGrandParent(node);
  node.parent.color = this.BLACK;
  GrandParent.color = this.RED;

  if(node === node.parent.left && node.parent === GrandParent.left)
  {
    this.RotateRight(GrandParent);
  }
  else if(node === node.parent.right && node.parent === GrandParent.right)
  {
    this.RotateLeft(GrandParent);
  }
};


Set489.prototype.add = function(value)
{
  var newNode = new NODE(value);

  if(this.m_root === null)
  {
    this.m_root = newNode;
    this.m_first = this.m_root;
    this.m_last = this.m_root;
    this.Balance(newNode);
    return true;
  }

    var node = this.m_root;
    while(true)
    {
      if(value < node.value)
      {
        if(node.left === null)
        {

          node.left = newNode;
          newNode.parent = node;
          this.m_last.next = newNode;
          newNode.previous = this.m_last;
          this.m_last = newNode;
          this.Balance(newNode);
          return true;
        }
        else
        {
          node = node.left;
        }
      }
      else if(value > node.value)
      {
        if(node.right === null)
        {
          node.right = newNode;
          newNode.parent = node;
          this.m_last.next = newNode;
          newNode.previous = this.m_last;
          this.m_last = newNode;
          this.Balance(newNode);
          return true;
        }
        else
        {
          node = node.right;
        }
      }
      else
      {
        //value === node.value
        return false;
      }
    }
};

Set489.prototype.remove = function(value)
{
  var node = this.find(this.m_root, value);

  if(node === null)
  {
    return false;
  }

  if(node.left !== null & node.right !== null)
  {
    var pre = node.left;
    while(pre.right !== null)
    {
      pre = pre.right;
    }
    node.value = pre.value;
    //BST.prototype.removeFromLinkedList.call(this, node);
    node = pre;
  }

  var child = (node.right === null) ? node.left : node.right;
  if(GetNodeColor(node) === this.BLACK)
  {
    node.color = GetNodeColor(child);
    this.BalanceDeleteNode(node);
  }

  this.SwapNode(node, child);

  if(this.GetNodeColor(this.m_root) === this.RED)
  {
    this.m_root.color = this.BLACK;
  }
  BST.prototype.removeFromLinkedList.call(this, node);
  return true;
};

Set489.prototype.BalanceDeleteNode = function(node, child)
{
  this.DeleteCase1(node);

};

Set489.prototype.DeleteCase1 = function(node)
{
  if(node.parent !== null)
  {
    this.DeleteCase2(node);
  }

};

Set489.prototype.DeleteCase2 = function(node)
{
  var sibling = this.GetSibling(node);
  if(GetNodeColor(sibling) === this.RED)
  {
    node.parent.color = this.RED;
    sibling.color = this.BLACK;

    if(node === node.parent.left)
    {
      this.RotateLeft(node.parent);
    }
    else
    {
      this.RotateRight(node.parent);
    }
  }
  this.DeleteCase3(node);
};

Set489.prototype.DeleteCase3 = function(node)
{
  var sibling = this.GetSibling(node);
  if(GetNodeColor(node.parent) === this.BLACK
    && GetNodeColor(sibling) === this.BLACK
    && GetNodeColor(sibling.left) === this.BLACK
    && GetNodeColor(sibling.right) === this.BLACK)
  {
    sibling.color = this.RED;
    this.DeleteCase1(node.parent);
  }
  else
  {
    this.DeleteCase4(node);
  }
};

Set489.prototype.DeleteCase4 = function(node)
{
  var sibling = this.GetSibling(node);
  if(GetNodeColor(node.parent) === this.RED
    && GetNodeColor(sibling) === this.BLACK
    && GetNodeColor(sibling.left) === this.BLACK
    && GetNodeColor(sibling.right) === this.BLACK)
  {
    sibling.color = this.RED;
    node.parent.color = this.BLACK;
  }
  else
  {
    this.DeleteCase5(node);
  }
};

Set489.prototype.DeleteCase5 = function(node)
{
  var sibling = this.GetSibling(node);

  if(node === node.parent.left
    && this.GetNodeColor(sibling) === this.BLACK
    && this.GetNodeColor(sibling.left) === this.RED
    && this.GetNodeColor(sibling.right) === this.BLACK)
  {
    sibling.color = this.RED;
    sibling.left.color = this.BLACK;
    this.RotateRight(sibling);
  }
  else if(node === node.parent.right
    && this.GetNodeColor(sibling) === this.BLACK
    && this.GetNodeColor(sibling.right) === this.RED
    && this.GetNodeColor(sibling.left) === this.BLACK)
  {
    sibling.color = this.RED;
    sibling.right.color = this.BLACK;
    this.RotateRight(sibling);
  }

  this.DelteCase6(node);
};

Set489.prototype.DelteCase6 = function(node)
{
  var sibling = this.GetSibling(node);
  sibling.color = GetNodeColor(node.parent);
  node.parent.color = this.BLACK;

  if(node === node.parent.left)
  {
    sibling.right.color = this.BLACK;
    this.RotateLeft(node.parent);
  }
  else
  {
    sibling.left.color = this.BLACK;
    this.RotateRight(node.parent);
  }
};

Set489.prototype.Balance = function(InsertedNode)
{
  if(InsertedNode.parent === null)
  {
    this.InsertCase1(InsertedNode);
  }
  else
  {
    this.InsertCase2(InsertedNode);
  }
};

Set489.prototype.GetNodeColor = function(node)
{
  return node === null ? this.BLACK : node.color;
}


Set489.prototype.forEach = function(callback, useInsertionOrder, current)
{
  //return BST.prototype.forEach.call(this, callback, useInsertionOrder);

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
      return
    }
    if(current != null)
    {
      this.forEach(callback, useInsertionOrder, current.left);
      callback.call(this, current.value, this.m_root);
      this.forEach(callback, useInsertionOrder, current.right);
    }
  }
};

// and more of your code down here
