class DirectedGraph {
  constructor() {
      this.nodes = [];
      this.adjacencyList = {};
  }
  
  addNode(node) {
      if (!this.adjacencyList[node]) {
          this.nodes.push(node);
          this.adjacencyList[node] = [];
      }
  }
  
  addEdge(node1, node2, weight) {
      this.adjacencyList[node1].push({node: node2, weight: weight});
  }
  
  print() {
      console.log(this.adjacencyList);
  }
}

export default DirectedGraph;
