#Growing a Tree

A **tree** **is** a common data structure in computer science. It represents a hierarchical structure amongst a set of nodes, where each node is a data structure consisting of both: a value and a list of references (pointers) to other nodes (children nodes). The structure is organized around a single root node.

>What are some examples where we've already seen trees

<!-- html page, file structure, objects -->

##Some Useful Terminology

* **Root** – The top node in a tree.
* **Child** – A node directly connected to another node when moving away from the Root.
* **Parent** – The converse notion of a child.
* **Siblings** – Nodes with the same parent.
* **Descendant** – A node reachable by repeated proceeding from parent to child.
* **Ancestor** – A node reachable by repeated proceeding from child to parent.
* **Leaf** – A node with no children.
* **Internal node** – A node with at least one child
* **External node** – A node with no children.
* **Degree** – Number of sub trees of a node.
* **Edge** – Connection between one node to another.
* **Path** – A sequence of nodes and edges connecting a node with a descendant.
* **Level** – The level of a node is defined by 1 + (the number of connections between the node and the root).
* **Height of node** – The height of a node is the number of edges on the longest path between that node and a leaf.
* **Height of tree** – The height of a tree is the height of its root node.
* **Depth** – The depth of a node is the number of edges from the node to the tree's root node.
* **Forest** – A forest is a set of n ≥ 0 disjoint trees.

##Binary Tree

The simplest form of a tree is a **Binary Tree**

![binary tree](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

It is comprised of an organized set of nodes, each with a pointer to other `left` / `right` nodes and a `value` of the current node.

```js
var node = {
  value: 7,
  left: null,
  right: null
};
```

In a binary search tree, nodes are ordered based no their values. For any given node, the left subtree's nodes are always less than that given node's value. The opposite is true of it's right subtree, the nodes' values are always greater. This simplifies searching for a value in a binary search tree. Head left when the value you're looking for is less than the node you’re on or go right otherwise.

The above tree was created in a particular order with nodes that have the following values: [8, 3, 1, 10, 6, 4, 7, 14, 13].

>Challenge: Build a new binary tree with the following values: [7, 13, 2, 8, 4, 3, 9, 1, 10]

##Abstract Syntax Trees

Besides searching for information, trees can also help computers breakdown and understand programs.

[Abstract syntax trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree) are an abstract representation of the logic a computer program executes; think pseudocode.

Let's take a look at the [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm) below.

```
//euclidean algorithm
while b ≠ 0
  if a > b
    a := a − b
  else
    b := b − a
return a
```

Here is the corresponding AST for the above program:

![syntanx tree](https://upload.wikimedia.org/wikipedia/commons/c/c7/Abstract_syntax_tree_for_Euclidean_algorithm.svg)

```
if a > b
  max = a
else
  max = b
return max
```
>Challenge: Draw an abstract syntax tree for the above program

##Bonus
* What is a [Balancing Binary Search Tree](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree)?
* How would you impliment a self-balancing tree, such as an [AVL Tree](https://www.youtube.com/watch?v=rwzuze_tTwQ)?
