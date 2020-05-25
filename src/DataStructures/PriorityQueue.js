class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    let added = false;
    let length = this.collection.length;
    for(let i = 0; i < length; i++) {
      if (this.collection[i].weight > element.weight) {
        this.collection.splice(i, 0, element);
        added = true;
      }
    }
    if (!added) {
      this.collection.push(element);
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}


export default PriorityQueue;
