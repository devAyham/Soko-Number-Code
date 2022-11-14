import Stracture from "./structure";

var _ = require("lodash");

export default class Logic {
    constructor(){
        this.stack = []
    }
    DFS(strrr){
        let str = _.cloneDeep(strrr)
        if(this.stack.length ===0){
            this.stack.push(str.patch)
        }
        else {
            for (let i = 0 ; i<this.stack.length ; i++){
                if(str.isEqual(str.currArr,this.stack[i])){
                    return ;
                }
                else {
                    console.log('pushed');
                    this.stack.push(str.currArr)
                }
            }
        }
        if(str.isEqual(str.currArr,str.finalArr)){
            return;
        }
        // let left = str.move('left',str.currArr)
        // let strl = new Stracture(left)
        // this.DFS(strl);
        let right = str.move('right',str.currArr)
        let r = new Stracture(right)
        this.DFS(r);
        // let top = str.move('top',str.currArr)
        // let strt = new Stracture(top)
        // this.DFS(strt);
        // let down = str.move('down',str.currArr);
        // let strd = new Stracture(down);
        // this.DFS(strd);
        
    }


}