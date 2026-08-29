export default function* specific(){
    const arr = [1,2,3,4,5]

    yield [
        {action:"set",type:'A',name:"arr",index:arr,scope:"main"}
    ]

    yield [
        {action:"indicate",index:[[arr[0],arr[4]],"hold"]}
    ]

    yield [
        {action:"swap",index:{[0]:4,[4]:0},name:"arr",scope:"main"}
    ]
    
    // [arr[0], arr[1]] = [arr[1], arr[0]];
    let temp = arr[0];
    arr[0] = arr[4];
    arr[4] = temp;

    console.log(arr)
    yield [{ action: "rearrange", index: [...arr], name: "arr",scope:"main" },
        {action:"indicate",index:[arr[2],"active"]}
    ]

    yield [
        {action:"indicate",index:[[...arr.slice(2)],"hold"]}
    ]

    yield [
        {action:"indicate",index:[arr[1],"active"]}
    ]

    yield [
        {action:"indicate",index:[arr[1],"match"]}
    ]
}