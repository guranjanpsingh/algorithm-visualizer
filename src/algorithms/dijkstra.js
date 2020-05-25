import PriorityQueue from '../DataStructures/PriorityQueue';

function djikstra(graph, source, target) {
  let visitedInOrder = [];
  let visited = {};
  let distances = {};
  let paths = {};
  for (let node of graph.nodes) {
    distances[node] = Infinity;
  }
  distances[source] = 0;

  let queue = new PriorityQueue();
  queue.enqueue({node: source, weight: 0});
  while(!queue.isEmpty()) {
    let current = queue.dequeue();
    let neighbors = graph.adjacencyList[current.node];
    if(visited[current.node]) {
      continue;
    }
    if (current.node === target) {
      break;
    }
    visitedInOrder.push(current.node);
    visited[current.node] = true;
    for(let neighbor of neighbors) {
      if (!visited[neighbor.node] && distances[neighbor.node] > distances[current.node] + neighbor.weight) {
        distances[neighbor.node] = distances[current.node] + neighbor.weight;
        paths[neighbor.node] = current.node;
        queue.enqueue(neighbor);
      }
    }
  }

  let shortestPath = getShortestPath(paths, source, target);

  return {
    distances,
    shortestPath,
    visitedInOrder
  }
}

function getShortestPath(paths, source, target) {
  let current = paths[target];
  let result = [target]
  while(current !== source) {
    result.push(current);
    current = paths[current];
  }
  return result.reverse();
}

export default djikstra;
