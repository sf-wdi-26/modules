#Data Structures: Stacks and Queues

##Stacks

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png" width="400px" alt="stack image with push and pop">

Stacks as a data structure are a lot like stacks as a physical structure. Think of stacks of dishes or books. We can remove an item from the top of the stack (by `pop`ing), or add an item to the top of the stack (by `push`ing it). While we may be able to Jenga stacks of real world objects, the data structure only allows us to manipulate the top item of the stack.  The `push` and `pop` operations for a stack are both O(1) - constant time. Some stack implementations also allow us to `peek` at the value of the top item without actually `pop`ing it off of the stack.

Stacks are "Last In, First Out" -- the last item pushed on top of a stack will be the first thing popped off of the stack.  

<img src="http://stratton.d11.org/PublishingImages/kid%20with%20pancakes.gif" alt="child defending stack of pancakes using fork and knife" width="400px">

*Jim dares you to try and `pop` from his stack of pancakes.*

Stacks are particularly useful in the innerworkings of any computer language. A stack is used to keep track of function/method calls, also known as the "call stack". The call stack keeps track of function calls that are in the process of executing.  When a function is called, it's `push`ed onto the call stack. When the function returns, it's `pop`ed off of the stack.
 
### Challenges: Stacks

1. Draw a stack after each of the following operations:

  * PUSH 0
  * POP
  * PUSH 2
  * PUSH 4
  * PUSH 6
  * POP
  * PUSH 8


1. Stacks and queues are often implemented with linked lists, an important data structure that we haven't talked about yet.  So, let's think of arrays.  How would you store a stack in an array?  How would you `push` something into the stack in constant time? How would you `pop` in constant time?


  *Hint: keep track of an index*


##Queues

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/2000px-Data_Queue.svg.png" width="400px" alt="queue image with enqueue and dequeue">

Queues as a data structure are a lot like queues as a physical structure. This makes more sense with British English, where *queue* means "a line" or "to line up". Think of an orderly line of people waiting to do something. We can remove an item from the front of the queue when its turn comes (by `pop`ing, also known as `dequeue`ing), or add an item to the back of the queue when it joins the line (by `push`ing or `enqueue`ing it). Again, while we may be able to "cut" in line in the real world, the queue data structure only allows us to add to the end of the stack or remove from the beginning.  The `push` and `pop` operations for a queue are both O(1) - constant time.  Like with stacks, some implementations of queues also allow us to `peek` at the value of the first item without `pop`ing it.

Queues are "First In, First Out" -- the first item enqueued will be the first to move all the way through the line and get dequeued.

<img src="http://www.rioleo.org/images/static/queuesafety.jpg" alt="stick figure demon eats person cutting in line -- from popcoaster.com" width="400px">

Queues are often used for scheduling and running ordered tasks. A server that responds to many requests simultaneously and in order or a **buffer** are both examples of queues.

> Note: buffers that temporarily stores data from one part of a program until another part of a program can process it. This is common with any asynchronous data transfer, or mismatches between how often data is sent and how often it can be processed.

### Challenges: Queues

1.  Draw a queue after each of the following operations:

  * PUSH 0
  * POP
  * PUSH 2
  * PUSH 4
  * PUSH 6
  * POP
  * PUSH 8

## Review

Would you use a stack or a queue to...

1. Print out a list of instructions that must be done in order?

1. Allow a user to undo changes to a document, one by one?

1. Let users create playlists and play back the songs?

1. Display *only* the 10 most recent messages a user posted, in the order they were posted?