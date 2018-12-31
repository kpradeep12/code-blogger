---
title:  "Graph Algorithms"
date:   2019-01-01 20:11:10 -0500
categories: algorithms
image: /assets/images/banners/no.jpg
description: "Learn Graph Algorithms with examples."
published: false
---

Lets begin learning **graph algorithms** in a fun and easier way. I try to simplify things with some examples so its easier to understand. How and where we can use Graph algorithms? below are some quick examples I came up with;

* Maps: Cities or places connected with roads.
* Electricity grid: Poles connected with electric lines.
* Rail transportation system: Passengers travel from one station to other.
* Package delivery system: Ship a package from office to customer.

All of the above examples can be represented in a graph. Points in a graph is called nodes (or Vertex) and these points can be any thing like city, station or pole and the connection between them are called edges.

![]({{site.baseurl}}/assets/images/posts/2018/12/basic-graph.jpg){: .width-35}{: .align-center}

## What kind of graphs we have?
There are many flavors of graphs available, some of them are below;

#### Directed or undirected
Edges in the graph can be directed or undirected, just like a road can be **One way** or **Two way**. If a graph is directed means all edges are one way and they represent the edge with an arrow to show the direction. If an edge between point a and b is directed means we can only travel from a to b but not in reverse. Where as in undirected we can travel in any direction.

#### Cyclic or acyclic
A graph can be cyclic if edges are connected in a way to form circles, such that we can reach a node from multiple directions. It is a acyclic graph if there are no circles.

#### Weighted or unweighted
A road in a map will have a distance, means edges can have some information and these graphs are called Weighted and edges with out any information are unweighted graphs.

## Ways to save the graph

There are two main ways to store the graphs **Adjacency matrix** and **Adjacency list**. Lets save below graph using these methods.

![]({{site.baseurl}}/assets/images/posts/2018/12/save-graph.jpg){: .width-35}{: .align-center}

#### Adjacency matrix

This is the simplest way to store a graph. If you observe below graph, it is have couple of nodes with each node having unique number. We can store each edge pair in a two dimensional array.

{% highlight java %}
int[][] graph = {
                {1,2,3},
                {0},
                {0,3,4},
                {2}
        };
{% endhighlight %}

To figure out if we have any edge between node 0 to 3 then we need to scan whole array in worst case.

#### Adjacency List

We can represent array indexes as nodes and the edges from that node as its value like below;

{% highlight java %}
Map<Integer, List<Integer>> graph = new HashMap<>(){
            {
                put(0, Arrays.asList(1, 2, 3));
                put(1, Arrays.asList(0));
                put(2, Arrays.asList(0, 3, 4));
                put(3, Arrays.asList(0, 2));
                put(4, Arrays.asList(2));
            }
        };
{% endhighlight %}

