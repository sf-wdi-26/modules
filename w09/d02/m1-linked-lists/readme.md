# Linked Lists

## What are linked lists?

![linked list image from wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/640px-Singly-linked-list.svg.png)

Linked lists store sequential (ordered) data in a series of "nodes".  Each node in a linked list contains some value and a reference or "pointer" to the next node.  If the linked list is "doubly linked", each node will also have another pointer to the previous node.  Linked lists that only have pointers to the next node are called "singly linked."

The very last node of a linked list, called the tail, has a null next node because nothing comes after it.  The very first node is called the head. The head will always have a null previous node (assuming the list is doubly linked) because nothing comes before the head.

Singly linked lists look a lot like trees, except each node can only have at most one child.

If you're asked an interview question about a linked list, make sure to clarify whether it's singly linked (only next node pointers) or doubly linked (both next and previous node pointers). We'll focus on singly linked lists.


## So like... arrays?

**No!**

We need to back up a step and take a closer look at arrays... it turns out they're not what we thought they were!

Arrays store data in one continuous block of computer memory.  The computer sets aside just enough memory when the array is created. That means, whenever you need to change the size of an array, you have to find a whole new block of memory that's big enough to fit the array. It also means you have to tell the computer exactly how big you want the array to be when you create it.

**... No I don't.**

No, you don't. In lower level computer programming languages like C, you *would* have to. Our high-level languages abstract that away and handle array resizing for you efficiently. But it's good to know that's what's happening in the background, because that's the biggest difference between arrays and linked lists.

**Linked lists don't need to be resized with one giant block of memory;** they can grow with pointers to other parts of the computer's memory.

**It's easier to insert into and delete from a linked list**, because with an array you'd need to move every element after the insertion point over by one. With a linked list... well you'll figure that out in the challenges.

On the other hand...

**You can't quickly access a particular node in a linked list, like you can with array indices.** You have to start with the head and move sequentially.

**Linked lists take up a bit more space** because in addition to storing the actual data, you have to store the pointers.

**It can take more time to access a full linked list,** because the data living in different places can't just be read as a continous chunk.

## Applications

* **file systems** Files are often stored in chunks, but when files grow large they may not fit in their original chunk. You can think of a file as a series of nodes with chunks of data and links to the next section of the file. (They're often actually implemented with a more complex data structure called a B-tree, but you can think of them as being like linked lists.)

* **implementing stacks and queues** Linked lists are a natural choice for these data structures that need fast access to beginning or end of a list... much more natural than arrays.


## GA Challenges (Advanced)

For those who are feeling warmed up and ready for a challenge, we give you the List prototype with the following methods:
1. `makeNode()`
1. `addAtEnd()`
1. `print()`

Your mission should you choose to accept it is to Implement the following:

1. `insertAtHead(data)`
1. `length()` 
1. `exists()`
1. `each()`
1. `indexOf()`
1. `dataFrom()`
1. `insertAt()`
1. `delete()`

#### A Different Approach (Intermediate)

We found a great article online that goes through this in great detail. For those who are not up for the GA Challenges, I recommend reading through the article and trying to implement each step on your own or with a partner. Try NOT to peek at the answers until you've tried to write something.

