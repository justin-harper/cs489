// Student name: Justin Harper
// Student ID: 10696738

// Do not modify this constructor function. Even if you are going for that 3rd
// "challenge point", you will only need to modify "add" and "remove".
function SortedLL489(optionalCompare)
{
    this.m_root = null;
    if (optionalCompare === undefined || optionalCompare == null)
    {
        this.m_compare = function(a,b)
        {
            if (a > b) { return 1; }
            return (a == b) ? 0 : -1;
        };
    }
    else
    {
        this.m_compare = optionalCompare;
    }
    Object.seal(this);
}


SortedLL489.prototype.add = function(valueToAdd)
{
    // TODO: Your code here (2 cases: this.m_root is null or non-null)
    //case 1 m_root == null
    var newNode = new Object();
    newNode.value = valueToAdd
    newNode.next = null;
    newNode.previous = null;

    //console.log("Inserting " + valueToAdd);


    if(this.m_root == null)
    {
        this.m_root = newNode;
        return;
    }
    else if(this.m_compare(newNode.value, this.m_root.value) == -1)
    {
        //insert at beginning of list

        //          m_root
        // |previous|value|next|-->...

        //          newNode
        // |previous|value|next|

        newNode.next = this.m_root;
        this.m_root.previous = newNode;
        this.m_root = newNode;

        return;
    }
    else
    {
        var current = this.m_root;
        var prev = current;

        while(current != null)
        {
            if(this.m_compare(newNode.value, current.value) == -1)
            {
                break;
            }
            prev = current;
            current = current.next;
        }

        //                  prev                     current
        // ...<-->|previous|value|next|<-->|previous|value|next|<-->...
        //                                        ^
        //                                        |
        //                        need to insert here |previous|value|next|

        prev.next = newNode;
        newNode.previous = prev;
        newNode.next = current;

        if(current != null)
        {
            current.previous = newNode
        }
    }

}

// Implement this function so that it removes the specified value from the list
// If the value is not in the list, then the list is not modified
SortedLL489.prototype.remove = function(valueToRemove)
{
    // TODO: Your code here

    //console.log("Removing " + valueToRemove);

    //sanity check
    if(this.m_root == null)
    {
        return;
    }

    if(this.m_root.value == valueToRemove)
    {
        if(this.m_root.next != null)
        {
            this.m_root.next.previous = null;
        }
        this.m_root = this.m_root.next;
    }

    var current = this.m_root;
    var prev = current;

    while(current != null)
    {
        if(current.value == valueToRemove)
        {
            //found it ... remove it
            prev.next = current.next;
            if(current.next != null)
            {
                current.next.previous = prev;
            }
            return;
        }

        //not it keep looking
        prev = current;
        current = current.next;
    }
}

// This function is implemented for you
// You must not alter it in any way
SortedLL489.prototype.toString = function()
{
    var node = this.m_root;
    var str = "";
    while (node !== undefined && node !== null)
    {
        // Append to string
        str += node.value.toString();

        // Check the 'next' member
        if (node.next === undefined)
        {
            str += "(node missing 'next' member)";
            return str;
        }
        else if (node.next !== null)
        {
            str += ",";
        }

        // Advance to the next node
        node = node.next;
    }
    return str;
}

