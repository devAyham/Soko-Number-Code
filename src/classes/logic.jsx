import PriorityQueue from "./priorityQueue";
import Queue from "./queue";
import Stracture from "./structure";

var _ = require("lodash");

export default class Logic {
  constructor() {
    this.stack = [];
    this.win = false;
    this.queue = new Queue();
    this.Pqueue = new PriorityQueue();
    this.PqueueWithH = new PriorityQueue();
    this.finalPath = [];
    this.visited = [];
    this.counter = 0;
    this.solution = null;
  }
  DFS(strrr) {
    let str = _.cloneDeep(strrr);
    if (this.stack.length === 0) {
      this.stack.push(str.patch);
      console.log("stack");
    } else {
      for (let i = 0; i < this.stack.length; i++) {
        if (str.isEqual(str.currArr, this.stack[i])) {
          // console.log("breaked");
          return;
        }
      }
      this.stack.push(str.currArr);
      this.counter++;
      console.log(this.counter);
    }
    if (str.isEqual(str.currArr, str.finalArr) || this.counter === 3000) {
      str.parent = [...str.parent, str.currArr];
      console.log(str.parent);
      for (let i = 0; i < str.path.length; i++) {
        this.finalPath.push([str.path[i], str.parent[i + 1]]);
      }
      this.win = true;
      this.solution = {
        path: this.finalPath,
        counter: this.counter,
        cost: 0,
      };
      return;
    }
    if (!this.win) {
      let top = _.cloneDeep(str).move("top", str.currArr);
      let strt = new Stracture(top);
      strt.parent = [...str.parent, str.currArr];
      strt.path = [...str.path, "Top"];
      this.DFS(strt);
    }
    if (!this.win) {
      let down = _.cloneDeep(str).move("down", str.currArr);
      let strd = new Stracture(down);
      strd.parent = [...str.parent, str.currArr];
      strd.path = [...str.path, "Down"];
      this.DFS(strd);
    }
    if (!this.win) {
      let right = _.cloneDeep(str).move("right", str.currArr);
      let strr = new Stracture(right);
      strr.parent = [...str.parent, str.currArr];
      strr.path = [...str.path, "right"];
      this.DFS(strr);
    }
    if (!this.win) {
      let left = _.cloneDeep(str).move("left", str.currArr);
      let strl = new Stracture(left);
      strl.parent = [...str.parent, str.currArr];
      strl.path = [...str.path, "left"];
      this.DFS(strl);
    }
  }

  newDFS(strrr) {
    let str = _.cloneDeep(strrr);
    // the visited node saved here
    if (strrr.isNewNode(strrr.currArr, this.visited)) {
      this.visited.push(str.currArr);
      this.counter++;
    }

    //is final
    if (str.isEqual(str.currArr, str.finalArr) || this.counter === 5500) {
      str.parent = [...str.parent, str.currArr];
      console.log(str.parent);
      for (let i = 0; i < str.path.length; i++) {
        this.finalPath.push([str.path[i], str.parent[i + 1]]);
      }
      this.win = true;
      this.solution = { path: this.finalPath, counter: this.counter, cost: 0 };
      return;
    }

    //get next state
    let sons = str.getNextMove(str.currArr);
    for (let i = 0; i < sons.length; i++) {
      const element = sons[i];
      //is new state عنجد
      if (element.isNewNode(element.currArr, this.visited)) {
        element.parent = [...str.parent, str.currArr];
        element.path = [...str.path, ...element.path];
        this.stack.push(element);
      }
    }

    // call the first ele in the stack
    if (this.stack.length !== 0 && this.win !== true) {
      console.log("sn");
      this.newDFS(this.stack.pop());
    }
  }

  BFS(strrr) {
    let str = _.cloneDeep(strrr);
    if (strrr.isNewNode(strrr.currArr, this.visited)) {
      this.visited.push(str.currArr);
      this.counter++;
    }

    //is final
    if (str.isEqual(str.currArr, str.finalArr)) {
      str.parent = [...str.parent, str.currArr];
      console.log(str.parent);
      for (let i = 0; i < str.path.length; i++) {
        this.finalPath.push([str.path[i], str.parent[i + 1]]);
      }
      this.win = true;
      this.solution = {
        path: this.finalPath,
        counter: this.counter,
        cost: 0,
      };
      return;
    }
    let sons = str.getNextMove(str.currArr);
    for (let i = 0; i < sons.length; i++) {
      const element = sons[i];
      if (element.isNewNode(element.currArr, this.visited)) {
        element.parent = [...str.parent, str.currArr];
        element.path = [...str.path, ...element.path];
        this.queue.enqueue(element);
      }
    }
    //pop first ele
    if (this.queue.length !== 0 && this.win !== true) {
      console.log("in");
      this.BFS(this.queue.dequeue());
    }
  }
  UCS(strrr) {
    let str = _.cloneDeep(strrr);
    if (strrr.element.isNewNode(strrr.element.currArr, this.visited)) {
      this.visited.push(str.element.currArr);
      this.counter++;
    }

    if (str.element.isEqual(str.element.currArr, str.element.finalArr)) {
      str.element.parent = [...str.element.parent, str.element.currArr];
      for (let i = 0; i < str.element.path.length; i++) {
        this.finalPath.push([str.element.path[i], str.element.parent[i + 1]]);
      }
      this.win = true;
      this.solution = {
        path: this.finalPath,
        counter: this.counter,
        cost: str.element.cost,
      };
      return;
    }
    let sons = str.element.getNextMove(str.element.currArr);
    for (let i = 0; i < sons.length; i++) {
      const ele = sons[i];
      if (ele.isNewNode(ele.currArr, this.visited)) {
        ele.parent = [...str.element.parent, str.element.currArr];
        ele.path = [...str.element.path, ...ele.path];
        ele.cost = str.element.cost + 1;
        this.Pqueue.enqueue(ele, ele.cost);
      }
    }
    if (this.Pqueue.length !== 0 && this.win !== true) {
      console.log("uc");
      this.UCS(this.Pqueue.dequeue());
    }
  }
  AStar(strrr) {
    let str = _.cloneDeep(strrr);
    if (strrr.element.isNewNode(strrr.element.currArr, this.visited)) {
      this.visited.push(str.element.currArr);
      this.counter++;
    }
    // if (this.PqueueWithH.isEmpty()) {
    //   this.PqueueWithH.enqueueStar(
    //     str.element,
    //     str.element.calcH(),
    //     str.element.calcH()
    //   );
    // }

    if (str.element.isEqual(str.element.currArr, str.element.finalArr)) {
      str.element.parent = [...str.element.parent, str.element.currArr];
      for (let i = 0; i < str.element.path.length; i++) {
        this.finalPath.push([str.element.path[i], str.element.parent[i + 1]]);
      }
      this.win = true;
      this.solution = {
        path: this.finalPath,
        counter: this.counter,
        cost: str.element.cost,
      };
      return;
    }

    let sons = str.element.getNextMove(str.element.currArr);
    for (let i = 0; i < sons.length; i++) {
      const ele = sons[i];
      if (ele.isNewNode(ele.currArr, this.visited)) {
        ele.parent = [...str.element.parent, str.element.currArr];
        ele.path = [...str.element.path, ...ele.path];
        ele.cost = str.element.cost + 1;
        let h = ele.calcH();
        this.PqueueWithH.enqueueStar(ele, ele.cost + h, h);
      }
    }
    if (this.PqueueWithH.length !== 0 && this.win !== true) {
      console.log("ASTAR");
      this.AStar(this.PqueueWithH.dequeue());
    }
  }
}
