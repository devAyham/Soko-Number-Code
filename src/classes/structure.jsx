// Load the full build.
var _ = require("lodash");

export default class Stracture {
  constructor(arr) {
    this.patch = arr;
    this.currArr = _.cloneDeep(arr);
    this.states = [_.cloneDeep(arr)];
    this.finalArr = [];
    this.boxes = [];
    this.targets = [];
    this.StaticBoxes = [];
    this.parent = [];
    this.path = [];
    this.cost = 0;
    // Destructuring Data From Array
    arr?.map((row, index) => {
      let tempRow = [];
      row.map((ele, index2) => {
        if (ele.charAt(0) === "B") {
          if (ele.length === 2) {
            let boxObj = {
              name: ele,
              x: index,
              y: index2,
            };
            ele = "E";
            this.boxes.push(boxObj);
            this.StaticBoxes.push(_.cloneDeep(boxObj));
            tempRow.push(ele);
            return ele;
          } else if (ele.length === 4) {
            let boxObj = {
              name: ele.slice(0, 2),
              x: index,
              y: index2,
            };
            let targwtObj = {
              name: ele.slice(2, 4),
              x: index,
              y: index2,
            };
            ele = "B" + ele.charAt(3) + ele.slice(2, 4);
            this.targets.push(targwtObj);
            this.boxes.push(boxObj);
            this.StaticBoxes.push(_.cloneDeep(boxObj));
            tempRow.push(ele);
            return ele;
          }
        } else if (ele.charAt(0) === "T") {
          let targwtObj = {
            name: ele,
            x: index,
            y: index2,
          };
          this.targets.push(targwtObj);
          let newEle = "B" + ele.charAt(1) + ele;
          tempRow.push(newEle);
          return ele;
        } else {
          tempRow.push(ele);
          return ele;
        }
      });
      this.finalArr.push(tempRow);
      tempRow = [];
      return row;
    });
  }
  isEqual(arr, arr2) {
    let flag = false;
    if (arr.length === arr2.length) {
      for (let i = 0; i < arr?.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
          if (arr[i][j] === arr2[i][j]) {
            flag = true;
          } else {
            flag = false;
            return flag;
          }
        }
      }
    }
    return flag;
  }
  cheackMove(box, direction, array) {
    switch (direction) {
      case "top":
        if (
          array[box.x - 1][box.y] === "E" ||
          array[box.x - 1][box.y].charAt(0) === "T"
        ) {
          return true;
        } else return false;
      case "down":
        if (
          array[box.x + 1][box.y] === "E" ||
          array[box.x + 1][box.y].charAt(0) === "T"
        ) {
          return true;
        } else return false;
      case "left":
        if (
          array[box.x][box.y - 1] === "E" ||
          array[box.x][box.y - 1].charAt(0) === "T"
        ) {
          return true;
        } else return false;
      case "right":
        if (
          array[box.x][box.y + 1] === "E" ||
          array[box.x][box.y + 1].charAt(0) === "T"
        ) {
          return true;
        } else return false;
      default:
        break;
    }
  }
  move(direction, arrayy) {
    // let array = [...arrayy];
    // let array = [...arrayy];
    let array = _.cloneDeep(arrayy);
    // console.log(this.cheackMove(box, direction, array));
    for (let i = 0; i < this.boxes.length; i++) {
      let box = this.boxes[i];
      if (this.cheackMove(box, direction, array)) {
        switch (direction) {
          // case "top":
          //   if (array[box.x][box.y].length === 2) {
          //     array[box.x][box.y] = "E";
          //   } else {
          //     array[box.x][box.y] = array[box.x][box.y].substring(2);
          //   }
          //   if (array[box.x - 1][box.y] === "E") {
          //     array[box.x - 1][box.y] = box.name;
          //   }
          //   if (array[box.x - 1][box.y].charAt(0) === "T") {
          //     array[box.x - 1][box.y] = box.name + array[box.x - 1][box.y];
          //   }
          //   this.boxes.map((boxx) => {
          //     if (boxx.name === box.name) {
          //       boxx.x -= 1;
          //     }
          //   });
          //   continue;
          // case "left":
          //   if (array[box.x][box.y].length === 2) {
          //     array[box.x][box.y] = "E";
          //   } else {
          //     array[box.x][box.y] = array[box.x][box.y].substring(2);
          //   }
          //   if (array[box.x][box.y - 1] === "E") {
          //     array[box.x][box.y - 1] = box.name;
          //   }
          //   if (array[box.x][box.y - 1].charAt(0) === "T") {
          //     array[box.x][box.y - 1] = box.name + array[box.x][box.y - 1];
          //   }
          //   this.boxes.map((boxx) => {
          //     if (boxx.name === box.name) {
          //       boxx.y -= 1;
          //     }
          //   });
          //   continue;
          // return array;
          case "down":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x + 1][box.y] === "E") {
              array[box.x + 1][box.y] = box.name;
            }
            if (array[box.x + 1][box.y].charAt(0) === "T") {
              array[box.x + 1][box.y] = box.name + array[box.x + 1][box.y];
            }
            this.boxes.map((boxx) => {
              if (boxx.name === box.name) {
                boxx.x += 1;
              }
            });
            continue;
          // return array;
          // return array;
          case "right":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x][box.y + 1] === "E") {
              array[box.x][box.y + 1] = box.name;
            }
            if (array[box.x][box.y + 1].charAt(0) === "T") {
              array[box.x][box.y + 1] = box.name + array[box.x][box.y + 1];
            }
            this.boxes.map((boxx) => {
              if (boxx.name === box.name) {
                boxx.y += 1;
              }
            });
            continue;
          // return array;
          default:
            break;
        }
      }
      // else return array;
    }
    for (let i = this.boxes.length - 1; i >= 0; i--) {
      let box = this.boxes[i];
      if (this.cheackMove(box, direction, array)) {
        switch (direction) {
          case "top":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x - 1][box.y] === "E") {
              array[box.x - 1][box.y] = box.name;
            }
            if (array[box.x - 1][box.y].charAt(0) === "T") {
              array[box.x - 1][box.y] = box.name + array[box.x - 1][box.y];
            }
            this.boxes.map((boxx) => {
              if (boxx.name === box.name) {
                boxx.x -= 1;
              }
            });
            continue;
          case "left":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x][box.y - 1] === "E") {
              array[box.x][box.y - 1] = box.name;
            }
            if (array[box.x][box.y - 1].charAt(0) === "T") {
              array[box.x][box.y - 1] = box.name + array[box.x][box.y - 1];
            }
            this.boxes.map((boxx) => {
              if (boxx.name === box.name) {
                boxx.y -= 1;
              }
            });
            continue;
          // return array;
          // case "down":
          //   if (array[box.x][box.y].length === 2) {
          //     array[box.x][box.y] = "E";
          //   } else {
          //     array[box.x][box.y] = array[box.x][box.y].substring(2);
          //   }
          //   if (array[box.x + 1][box.y] === "E") {
          //     array[box.x + 1][box.y] = box.name;
          //   }
          //   if (array[box.x + 1][box.y].charAt(0) === "T") {
          //     array[box.x + 1][box.y] = box.name + array[box.x + 1][box.y];
          //   }
          //   this.boxes.map((boxx) => {
          //     if (boxx.name === box.name) {
          //       boxx.x += 1;
          //     }
          //   });
          //   continue;
          // // return array;
          // // return array;
          // case "right":
          //   if (array[box.x][box.y].length === 2) {
          //     array[box.x][box.y] = "E";
          //   } else {
          //     array[box.x][box.y] = array[box.x][box.y].substring(2);
          //   }
          //   if (array[box.x][box.y + 1] === "E") {
          //     array[box.x][box.y + 1] = box.name;
          //   }
          //   if (array[box.x][box.y + 1].charAt(0) === "T") {
          //     array[box.x][box.y + 1] = box.name + array[box.x][box.y + 1];
          //   }
          //   this.boxes.map((boxx) => {
          //     if (boxx.name === box.name) {
          //       boxx.y += 1;
          //     }
          //   });
          //   continue;
          // // return array;
          default:
            break;
        }
      }
      // else return array;
    }
    // console.log(array);
    return array;
    //   SetCurArray([...level_one.move(level_one.boxes[0], "right", currArray)]);
  }
  testMove(direction, arrayy) {
    const array = _.cloneDeep(arrayy);
    for (let i = 0; i < this.boxes.length; i++) {
      let box = this.boxes[i];
      if (this.cheackMove(box, direction, array)) {
        switch (direction) {
          case "top":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x - 1][box.y] === "E") {
              array[box.x - 1][box.y] = box.name;
            }
            if (array[box.x - 1][box.y].charAt(0) === "T") {
              array[box.x - 1][box.y] = box.name + array[box.x - 1][box.y];
            }
            continue;
          // return array;
          case "down":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x + 1][box.y] === "E") {
              array[box.x + 1][box.y] = box.name;
            }
            if (array[box.x + 1][box.y].charAt(0) === "T") {
              array[box.x + 1][box.y] = box.name + array[box.x + 1][box.y];
            }
            continue;
          // return array;
          case "left":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x][box.y - 1] === "E") {
              array[box.x][box.y - 1] = box.name;
            }
            if (array[box.x][box.y - 1].charAt(0) === "T") {
              array[box.x][box.y - 1] = box.name + array[box.x][box.y - 1];
            }
            continue;
          // return array;
          case "right":
            if (array[box.x][box.y].length === 2) {
              array[box.x][box.y] = "E";
            } else {
              array[box.x][box.y] = array[box.x][box.y].substring(2);
            }
            if (array[box.x][box.y + 1] === "E") {
              array[box.x][box.y + 1] = box.name;
            }
            if (array[box.x][box.y + 1].charAt(0) === "T") {
              array[box.x][box.y + 1] = box.name + array[box.x][box.y + 1];
            }
            continue;
          // return array;
          default:
            break;
        }
      }
      // else return array;
    }
    if (!this.isEqual(array, arrayy)) return array;
    //   SetCurArray([...level_one.move(level_one.boxes[0], "right", currArray)]);
  }
  getNextMove(array) {
    const movesArray = [];
    let arr1 = _.cloneDeep(array);
    let arr2 = _.cloneDeep(array);
    let arr3 = _.cloneDeep(array);
    let arr4 = _.cloneDeep(array);

    let arr11 = this.testMove("left", arr1) || false;
    let arr21 = this.testMove("right", arr2) || false;
    let arr31 = this.testMove("top", arr3) || false;
    let arr41 = this.testMove("down", arr4) || false;

    if (arr31 !== false && this.isNewState(arr31)) {
      // this.states.push(arr31);
      let nesStrT = new Stracture(arr31);
      nesStrT.path = ["Top"];
      movesArray.push(nesStrT);
    }
    if (arr41 !== false && this.isNewState(arr41)) {
      // this.states.push(arr41);
      let nesStrD = new Stracture(arr41);
      nesStrD.path = ["Down"];
      movesArray.push(nesStrD);
    }
    if (arr21 !== false && this.isNewState(arr21)) {
      // this.states.push(arr21);
      let nesStrR = new Stracture(arr21);
      nesStrR.path.push("right");
      movesArray.push(nesStrR);
    }
    if (arr11 !== false && this.isNewState(arr11)) {
      // this.states.push(arr11);
      let nesStrL = new Stracture(arr11);
      nesStrL.path = ["left"];
      movesArray.push(nesStrL);
    }

    return movesArray;
  }
  isNewState(arr) {
    for (let i = 0; i < this.states.length; i++) {
      if (this.isEqual(arr, this.states[i])) {
        return false;
      }
    }
    return true;
  }
  isNewNode(arr, arrays) {
    for (let i = 0; i < arrays.length; i++) {
      if (this.isEqual(arr, arrays[i])) {
        return false;
      }
    }
    return true;
  }
  calcH() {
    let h = 0;
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].name.charAt(1) === this.targets[i].name.charAt(1)) {
        h =
          h +
          Math.abs(this.boxes[i].x - this.targets[i].x) +
          Math.abs(this.boxes[i].y - this.targets[i].y);
      }
    }
    return h;
  }
}
