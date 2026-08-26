export default function* palindrome(){
    const arr = ['r','a','c','e','c','a','r']
    yield [
        { action : "log", index : ["Initialized array"]},
        { action : "set", index : arr, type:'A',name:"arr"}
    ]

    let i = 0, j = arr.length - 1;
    while(i <= j){
        yield [
                { action : "log", index : [`Pointing arr[${i}] and arr[${j}]`]},
                { action : "hold", index : [i,j],name:"arr"}
            ]
        if(arr[i] != arr[j]){
            yield [
                {action : "match", index : [i,j],name:"arr"},
                { action : "log", index : ["Not equal"]}
            ]
            return;
        }
        i++;
        j--;
    }
    yield [
            { action : "log", index : ["Palindrome!"]}
        ]

}