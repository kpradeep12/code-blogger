---
title:  "Graph Algorithms"
date:   2019-01-01 20:11:10 -0500
categories: algorithms
image: /assets/images/banners/no.jpg
description: "Learn Graph Algorithms with examples."
published: false
---

Lets begin learning **graph algorithms** in a fun and easier way. I try to simplify things with some examples so its easier to understand. How and where we can use Graph algorithms? below are some examples;

* Maps: Cities or places connected with roads.
* Electricity grid: Poles connected with electric lines.
* Rail transportation system: Passengers travel from one station to other.
* Package delivery system: Ship a package from office to customer.

All of the above examples can be represented in a graph. Points in a graph are called nodes (or Vertices) like cities, stations or poles and the connection between them are called edges.

![]({{site.baseurl}}/assets/images/posts/2018/12/basic-graph.jpg){: .width-35}{: .align-center}

## What kind of graphs we have?
There are many flavors of graphs, some of them are below;

#### Directed or undirected
Edges in the graph can be directed or undirected, just like a road can be **One way** or **Two way**. If a graph is directed means all edges are one way and they represent the edge with an arrow to show the direction. If an edge between point a and b is directed means we can only travel from a to b but not in reverse. Where as in undirected we can travel in any direction.

#### Cyclic or acyclic
A graph can be cyclic if edges are connected in a way to form circles, such that we can reach a node from multiple directions. It is a acyclic graph if there are no circles.

#### Weighted or unweighted
A road in a map will have a distance, means edges can have some information and these graphs are called Weighted and edges with out any information are unweighted graphs.

## Represent a Graph

There are two main ways to store the graphs; **Adjacency matrix** and **Adjacency list**. Adjacency list is most commonly used way to save graph so I will not cover Adjaceny matrix in this article. Lets use below graph as a reference to understand how Adjacency lists works.

![]({{site.baseurl}}/assets/images/posts/2018/12/save-graph.jpg){: .width-35}{: .align-center}

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

