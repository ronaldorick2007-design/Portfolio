import { TreeNode } from "../../data_structures/TreeNode"
import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList";

export default function* main_preorder(){
    const root = new TreeNode(1);
    const node1 = new TreeNode(2);
    const node2 = new TreeNode(3);
    const node3 = new TreeNode(4);
    const node4 = new TreeNode(5);
    const node5 = new TreeNode(6);

    root.left = node1;
    root.right = node2;
    node1.left = node3;
    node1.right = node4;
    node2.right = node5;

    yield [
        {action:"set",type:"T",index:root,name:"root", scope:"main"},
        {action:"log", index:["Initialized tree"]}
    ] 

    let res = new SinglyLinkedList();
    yield [
        {action:"set",type:"L",index:res,name:"res", scope:"main"},
        {action:"log", index:["Initialized Singly Linked List"]}
    ]
    yield* preorder(root, res);

    yield [
        {action:"log", index:["Preordered traversal..."]}
    ]

    // res.tail.next = res.head;
    yield* sll_traversal(res.head);
}

function* preorder(root, res,depth=1){
    // yield [
    //     {action:"set",type:"F",scope:`preorder${depth}`},
    //     {action:"log", index:["Entering preorder function..."]}
    // ]

    if(!root){
        // yield[
        //     {action:"clear",scope:`preorder${depth}`},
        //     {action:"log", index:[`Base case : empty node, so exited preorder function...`]}
        // ]
        return
    };

    yield [
        {action:"indicate",index:[root,"active"]},
        {action:"log", index:[`Appending node ${root.value} to res`]}
    ]

    res.add(root.value);
    yield [
        {action:"rearrange",index:res,name:"res",scope:"main"}
    ]

    yield* preorder(root.left, res,depth+1);
    yield* preorder(root.right, res, depth+1)

    // yield[
    //     {action:"clear",scope:`preorder${depth}`},
    //     {action:"log", index:["Exited preorder function..."]}
    // ]
}

function* sll_traversal(head){
    let curr = head;

    while(curr !== null){
        console.log(curr)
        yield [
        {action:"indicate",index:[curr,"active"]},
        ]
        curr = curr.next;
    }
}
