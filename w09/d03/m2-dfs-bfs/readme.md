#Searching Trees

##Breadth First

Breadth First Search chooses a start node and "visits" every node of a graph in order of how many edges the node is from that start. In a tree, we pick the root as the start node. We'll also consider each node to be the same "length." In graph terms, that means the "weight" of each edge is the same. Breadth first search only works for graphs with unweighted edges or graphs where all the edge weights are the same.

Breadth First Search spreads like a mold across the tree or graph, moving outward one step at a time from its start location. Breadth First Search used a queue (first in is first out) to keep track of which nodes to visit next.

![bfs](https://camo.githubusercontent.com/2f57e6239884a1a03402912f13c49555dec76d06/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f342f34362f416e696d617465645f4246532e676966)
>The white nodes about have not yet been searched, the greyed out one are currently in the queue, while the black ones have been searched.

##Depth First 

Depth First Search is another algorithm that searches through (potentially) every node in a graph. Like with Breadth First Search, we can search for many keys, search by criteria that aren't based on keys, keep track of depth.

Depth First Search chooses a start node and "visits" all the nodes in the graph by following each path as far (as deep) as it can before going to the next path. In a tree, we pick the root as the start node (surprise!).

Depth First Search follows an "always go left" path like some people use to systematically solve mazes.

![dfs](https://camo.githubusercontent.com/aaad9e39961daf34d967c616edeb50abf3bf1235/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966)