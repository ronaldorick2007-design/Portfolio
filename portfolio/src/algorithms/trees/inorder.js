import { TreeNode } from "../../data_structures/TreeNode"
import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList";

export default function* main_inorder(){
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
    yield* inorder(root, res);

    yield [
        {action:"log", index:["inordered traversal..."]}
    ]

    // res.tail.next = res.head;
    yield* sll_traversal(res.head);
}

function* inorder(root, res,depth=1){
    // yield [
    //     {action:"set",type:"F",scope:`inorder${depth}`},
    //     {action:"log", index:["Entering inorder function..."]}
    // ]

    if(!root){
        // yield[
        //     {action:"clear",scope:`inorder${depth}`},
        //     {action:"log", index:[`Base case : empty node, so exited inorder function...`]}
        // ]
        return
    };

    yield [
        {action:"indicate",index:[root,"active"]},
        
    ]

    yield* inorder(root.left, res,depth+1);

    res.add(root.value);
    yield [
        {action:"rearrange",index:res,name:"res",scope:"main"},
        {action:"log", index:[`Appending node ${root.value} to res`]}
    ]
    
    yield* inorder(root.right, res, depth+1)

    // yield[
    //     {action:"clear",scope:`inorder${depth}`},
    //     {action:"log", index:["Exited inorder function..."]}
    // ]
}

function* sll_traversal(head){
    let curr = head;

    while(curr !== null){
        yield [
        {action:"indicate",index:[curr,"active"]},
        ]
        curr = curr.next;
    }
}
