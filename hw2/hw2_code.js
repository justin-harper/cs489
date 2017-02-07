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
  this.parrent  = null;
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

BST.prototype.add = function(value)
{
  if(this.m_root == null)
  {
    this.m_root = new NODE(value);
    return;
  }

  var parrent = this.m_root;
  var current = this.m_root;


  while(current != null)
  {
    if(current.value == value)
    {
      return false;
    }
    if(current.value > value)
    {
      parrent = current;
      current = current.left;
    }
    else
    {
      parrent = current;
      current = current.right;
    }
  }

  if(parrent.value > value)
  {
    var x = new NODE(value);

    parrent.right = x;
    parrent.right.parrent = parrent;
    x.previous = parrent.previous;

    if(parrent.previous != null)
    {
      parrent.previous.next = x;
    }

    x.next = parrent;
  }
  else
  {
    var x = new NODE(value);

    parrent.left = x;
    parrent.left.parrent = parrent;
    x.previous = parrent;
    x.next = parrent.next;

    if(parrent.next != null)
    {
      parrent.next.previous = x;
    }

  }

  return true;
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
  if(current == undefined)
  {
    current = this.m_root;
  }
  while(current.right != null)
  {
    current = current.right;
  }

  return current;
}

BST.prototype.getMin = function()
{
  var current = this.m_root;
  while(current.left != null)
  {
    current = current.left;
  }
  return current.value;
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

BST.prototype.remove = function(value)
{
  if(this.m_root == null)
  {
    return;
  }

  if(this.m_root.value == value)
  {
    if(this.m_root.previous != null)
    {
      this.m_root = this.m_root.previous;
    }
    else
    {
      this.m_root = this.m_root.next;
    }
  }

  var current = this.m_root;
  var previous = this.m_root;
  while(current != null)
  {
    if(current.value == value)
    {
      if(previous.value > value)
      {
        previous.left = getMax(current);
        previous.left.left = current.left;
      }
    }
    if(current.value > value)
    {
      current = current.left;
    }
  }

};

BST.prototype.toString = function(delimiter)
{
  if(delimiter == undefined)
  {
    delimiter = " ";
  }

  if(this.m_root == null)
  {
  return "";
  }

  var current = this.m_first;
  var s = "";
  while(current != null)
  {
    s += current.value;
    if(current.next != null)
    {
      s += delimiter;
    }
  }

  return s;
};

BST.prototype.forEach = function()
{
  // body...
};

// and more of your code down here
