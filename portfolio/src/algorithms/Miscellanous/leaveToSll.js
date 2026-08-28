import { TreeNode } from "../../data_structures/TreeNode"

export default function* leaveToSll(){
    const root = new TreeNode(0);
    const left = new TreeNode(1);
    const right = new TreeNode(2);

    yield [
        {action:"set",type:"T",index:root,name:"root"}
    ]

}