import Graph from '../DataStructures/Graph';
function createGraphFromBoard(width, height, walls) {
  let graph = new Graph();
  let edges = createEdges(width, height, walls);
  for(let edge of edges) {
      graph.addNode(edge[0]);
      graph.addNode(edge[1]);
      graph.addEdge(edge[0], edge[1], edge[2]);
  }
  console.log(graph);
  return graph;
}

function createEdges(width, height, walls) {
  let edges = [];
  for(let row = 0; row < height; row++) {
    for(let col = 0; col < width; col++) {
      let node = (row * width) + col + 1; 
      if (walls[node]) continue;
      let neighbors = [[row - 1, col],[row + 1, col],[row, col - 1],[row, col + 1]];
      for(let neighbor of neighbors) {
        let nextRow = neighbor[0];
        let nextCol = neighbor[1];
        if (nextRow >= 0 
            && nextRow < height 
            && nextCol >= 0 
            && nextCol <= width
            && !walls[neighbor]) {
          let nextNode = (nextRow * width) + nextCol + 1;
          edges.push([node, nextNode, 1]);
        }
      }
    }
  }
  return edges;
}


export default createGraphFromBoard;
