import { Node } from "../../data_structures/Node";

export default function* specific(){
    let arr = {1:[2],2:[],3:[],4:[]}
    yield[{ action : "set", index : arr, type:'G',name:"arr"}]

    arr = {1:[2],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]}
    yield[{ action : "rearrange",index : arr,name:"arr"}]
}