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
  // if(first.value < seccond.value)
  // {
  //   return -1;
  // }
  // else if(first.value > seccond.value)
  // {
  //   return 1;
  // }
  // return 0;
};

BST.prototype.add = function(newValue)
{
  console.log("adding " + newValue);
  if(this.m_root == null)
  {
    this.m_root = new NODE(newValue);
    this.m_first = this.m_root;
    this.m_last = this.m_root;
    console.log("added " + newValue + " as root");
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
  // var i = 0;
  // var current = this.m_first;
  // while(current!= null)
  // {
  //   current = current.next;
  //   i++;
  // }

  // return i;
};

BST.prototype.getLevel = function(value)
{
  // if(this.m_root == null)
  // {
  //   return -1;
  // }
  // if(this.m_root.value == value)
  // {
  //   return 0;
  // }
  // var i = 0;
  // var current = this.m_root;
  // while(current != null)
  // {
  //   if(current.value == value)
  //   {
  //     return i;
  //   }
  //   if(current > value)
  //   {
  //     current = current.left;
  //     i++;
  //   }
  //   else
  //   {
  //     current = current.right
  //     i++;
  //   }
  // }
  // return -1;
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
  // if(this.getLevel(value) >= 0)
  // {
  //   return true;
  // }
  // else
  // {
  //   return false;
  // }
};

BST.prototype.remove = function(value)
{
  if(this.m_root == null)
  {
    return false;
  }
  //this.m_root is our value to remove
  if(this.m_root.value == value)
  {
    //remove root
    if(this.m_root.right != null)
    {
      //find min of right side
      var tmp = this.getMin(this.m_root.right);

      //remove left from parent
      tmp.parent.left = null;

      //remove parent from tmp
      tmp.parent = null;


      //we are replaceing m_root with tmp

      //fix up parent pointers of m_roots children
      if(this.m_root.left != null)
      {
        this.m_root.left.parent = tmp;
      }

      if(this.m_root.right != null && this.m_root.right != tmp)
      {
        this.m_root.right.parent = tmp;
      }

      //make m_roots children tmps children
      if(tmp != this.m_root.right)
      {
        tmp.right = this.m_root.right;
      }
      tmp.left = this.m_root.left




      //fix up linked list
      var previous = this.m_root.previous;
      var next = this.m_root.next;

      if(previous != null)
      {
        if(this.m_root != this.m_first)
        {
          previous.next = next;
        }
        else
        {
          this.m_first = this.m_first.next;
        }
        if(this.m_root != this.m_last)
        {
          previous.next = this.m_root.next;
        }
        else
        {
          this.m_last = this.m_last.previous;
        }
      }
      //move this.m_root to tmp
      this.m_root = tmp;
      return true;
    }
    else
    {
      if(this.m_root.left == null)
      {
        //no right child && no left child...remove m_root
        this.m_root = null;
        return true;
        this.m_first = null;
        this.m_last = null;
      }
      //m_root.right == null
      //need to replace m_root with largest value on left
      var tmp = this.getMax(this.m_root.left);
      //remove right from tmp.parent
      tmp.parent.right = null;

      //remove parent from tmp
      tmp.parent = null;

      //we are replaceing m_root with tmp

      //fix up parent pointers of m_roots children
      //we already know that this.m_root.right == null
      if(this.m_root.left != null && this.m_root.left != tmp)
      {
        this.m_root.left.parent = tmp;
      }

      //make m_root.left tmp.left
      if(tmp != this.m_root.left)
      {
        tmp.left = this.m_root.left;
      }
      //should be null right?
      tmp.right = this.m_root.right;

      //fix up linked list
      var previous = this.m_root.previous;
      var next = this.m_root.next;
      if(this.m_root != this.m_first)
      {
        previous.next = next;
      }
      else
      {
        this.m_first = this.m_first.next;
      }
      if(this.m_root != this.m_last)
      {
        previous.next = this.m_root.next;
      }
      else
      {
        this.m_last = this.m_last.previous;
      }
      //move this.m_root to tmp
      this.m_root = tmp;
      return true;
    }

  }
  else
  {
    //not this.m_root...
    var current = this.m_root;
    var parent = this.m_root;

    while(current != null)
    {
      if(current.value == value)
      {

        //remove current == parent.right
        if(current.right != null)
        {
          //get min of right side
          var tmp = this.getMin(current.right);

          //remove left of parrent
          tmp.parent.left = null;

          //remove parent from tmp and set to currents parent
          tmp.parent = current.parent;

          //fix up parent pointers of currents children
          if(current.left != null)
          {
            current.left.parent = tmp;
          }
          if(current.right != null && current.right != tmp)
          {
            current.right.parent = tmp;
          }

          //make curents children tmps children
          if(tmp != current.right)
          {
            tmp.right = current.right
          }
          tmp.left = current.left;
        }
        else
        {
          //current.right == null
          //get largest value on left
          if(current.left != null)
          {
            var tmp = this.getMax(current.left);

            //remove right from tmp.parrent
            tmp.parent.right = null;

            //set tmp.parent = current.parrent
            tmp.parent = current.parent;

            //we are replacing current with tmp

            //fix up parent pointers of currents children
            //we already know that current.right == null

            if(current.left != null && current.left != tmp)
            {
              current.left.parent = tmp;
            }

            //make curent.left tmp.left
            if(tmp != current.left)
            {
              tmp.left = current.left
            }
            //should be null right?
            tmp.right = current.right;

          }
          else
          {
            //no left && no right
            tmp = null;
          }
        }

        //fix up curent.parent so it points to tmp
        if(current == parent.left)
        {
          parent.left = tmp;
        }
        else
        {
          parent.right = tmp;
        }

        //fix up linked list

        if(current == this.m_first)
        {
          this.m_first = this.m_first.next;
          this.m_first.previous = null;
        }
        if(current == this.m_last)
        {
          this.m_last = this.m_last.previous;
          this.m_last.next = null;
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
      if(value < current.value)
      {
        parent = current;
        current = current.left;
      }
      else
      {
        parent = current;
        current = current.right;
      }
    }

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

BST.prototype.forEach = function()
{
  // body...
};

// and more of your code down here
