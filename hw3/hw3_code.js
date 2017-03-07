// Student name: Justin Harper
// Student ID: 10696738

// Don't forget to include the .js file for the base class along with
// this one when submitting to Blackboard!

function Set489(compareFunction)
{
    // your code here
  BST.call(this, compareFunction);
  this.BLACK = 'black';
  this.RED = 'red';
};

Set489.prototype = Object.create(BST.prototype);

Set489.prototype.GetNodeColor = function(node)
{
  return node === null ? this.BLACK : node.color;
};

Set489.prototype.GetGranparent = function(node)
{
  if(node.parent !== null && node.parent.parent !== null)
  {
    return node.parent.parent;
  }
  else return null;
}

Set489.prototype.GetUncle = function(node)
{
  var gp = this.GetGranparent(node);
  if(gp !== null)
  {
    if(node === gp.left)
    {
      return gp.right;
    }
    else
    {
      return gp.left;
    }
  }
  else
  {
    return null;
  }
}

Set489.prototype.add = function(value)
{
  var node = BST.prototype.add2.call(this, value);
  if(node === false)
  {
    return false;
  }
  node.color = this.RED;
  return this.InsertCase1(node);
}

Set489.prototype.InsertCase1 = function(node)
{
  if(node.parent === null)
  {
    node.color = this.BLACK;
    return true;
  }
  else
  {
    return this.InsertCase2(node);
  }
}

Set489.prototype.InsertCase2 = function(node)
{
  if(node.parent.color === this.BLACK)
  {
    return true;
  }
  else
  {
    return this.InsertCase3(node);
  }
}

Set489.prototype.InsertCase3 = function(node)
{
  var U = this.GetUncle(node);

  if(U !== null && U.color === this.RED)
  {
    node.parent.color = this.BLACK;
    U.color = this.BLACK;
    var G = this.GetGranparent(node);
    G.color = this.RED;
    return this.InsertCase1(G);
  }
  else
  {
    return this.InsertCase4(node);
  }
}

Set489.prototype.InsertCase4 = function(node)
{
  var G = this.GetGranparent(node);

  if(node === node.parent.right && node.parent === G.left)
  {
    this.RotateLeft(node.parent);
    node = node.left;
  }
  else if(node === node.parent.left && node.parent === G.right)
  {
    this.RotateRight(node.parent);
    node = node.right;
  }

  return this.InsertCase5(node);
}

Set489.prototype.InsertCase5 = function(node)
{
  var G = this.GetGranparent(node);

  node.parent.color = this.BLACK;
  G.color = this.RED;

  if(node === node.parent.left)
  {
    this.RotateRight(G);
  }
  else
  {
    this.RotateLeft(G);
  }

  return true;
}

Set489.prototype.RotateRight = function(B)
{
  if(B.parent !== null)
  {
    var P = B.parent;

    if(P !== null)
    {
      var A = B.left;

      if(A !== null)
      {
        var two = A.right;
        if(B === P.left)
        {
          P.left = A;
        }
        else
        {
          P.right = A;
        }
        A.parent = P;
        A.right = B;
        B.parent = A;
        B.left = two;
        if(two !== null)
        {
          two.parent = B;
        }
        return;
      }
      else
      {
        return;
      }
    }
    else
    {
      // P === null ==> B is m_root

      var A = B.left;
      if(A !== null)
      {
        A.parent = null;
        A.right = B;
        B.parent = A;
        B.left = two;
        if(two !== null)
        {
          two.parent = B;
        }
        return;
      }
    }
  }
}

Set489.prototype.RotateLeft = function(A)
{
  var P = A.parent;

  if(P !== null)
  {

    var B = A.right;

    if(B !== null)
    {
      var two = B.left;             //        P                       P
                                    //        |                       |
                                    //        A                       B
      if(A === P.Left)              //       / \                     / \
      {                             //      1   B     ==>           A   3
        P.left = B;                 //         / \                 / \
      }                             //        2   3               1   2
      else
      {
        P.right = B;
      }

      B.parent = P;

      B.left = A;
      A.parent = B;
      A.right = two;
      if(two !== null)
      {
        two.parent = A;
      }
      return;
    }
    else
    {
      //B is null                   //    P
     return;                        //    |
                                    //    A
                                    //   / \
                                    //  1   null
    }
 }
 else
 {
  //P is Null ==> A is this.m_root



  var B = A.right;

  if(B !== null)
  {
    var two = B.left;


    B.parent = null;
    B.left = A;
    A.parent = B;
    A.right = two;
    if(two !== null)
    {
      two.parent = A;
    }
    this.m_root = B;
    return;
  }
 }
}


Set489.prototype.GetSibling = function(node)
{
  if(node === null || node.parent === null)
  {
    return null;
  }
  if(node === node.parent.left)
  {
    return node.parent.right;
  }
  else
  {
    return node.parent.left;
  }
}


Set489.prototype.FindNode = function(value)
{
  if(value === undefined)
  {
    return null;
  }
  var node = this.m_root;

  while(node !== null)
  {
    if(node.value === value)
    {
      return node;
    }
    else if(node.value > value)
    {
      node = node.left;
    }
    else
    {
      node = node.right;
    }
  }
  return null;
}



Set489.prototype.SwapNode = function(replaceMe, withMe)
{
  if(replaceMe.parent === null)
  {
    if(withMe === withMe.parent.left)
    {
      withMe.parent.left = replaceMe;
    }
    else
    {
      withMe.parent.right = replaceMe;
    }
    replaceMe.parent = withMe.parent;
    this.m_root = withMe;
    withMe.parent = null;

  }
  else
  {
    if(replaceMe === replaceMe.parent.left)
    {
      if(withMe === withMe.parent.left)
      {
        withMe.parent.left = replaceMe;
      }
      else
      {
        withMe.parent.right = replaceMe;
      }

      var P = replaceMe.parent;

      replaceMe.parent.left = withMe;
      replaceMe.parent = withMe.parent;
      withMe.parent = P;

    }
    else
    {
      if(withMe === withMe.parent.left)
      {
        withMe.parent.left = replaceMe;
      }
      else
      {
        withMe.parent.right = replaceMe;
      }

      var P = replaceMe.parent;
      replaceMe.parent.right = withMe;
      replaceMe.parent = withMe.parent;
      withMe.parent = P;
    }
  }
};

Set489.prototype.remove = function(value)
{
  var node = this.FindNode(this.m_root, value);
  if(node !== null)
  {
    this.remove2(node);

    if(this.GetNodeColor(this.m_root) === this.RED)
    {
      this.m_root.color = this.BLACK;
    }
    return true;
  }
  return false;
}


Set489.prototype.remove2 = function(node)
{
  if(node === null)
  {
    return false;
  }

  if(node.left !== null & node.right !== null)
  {
    var max = BST.GetMax(node.left);
    SwapNode(node, max);
    return this.remove2(max);
  }


  if(GetNodeColor(node) === this.RED)
  {
    return BST.remove.call(node.value);
  }

  this.BalanceDeleteNode(node);
  return BST.remove.call(this, node.value);
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
