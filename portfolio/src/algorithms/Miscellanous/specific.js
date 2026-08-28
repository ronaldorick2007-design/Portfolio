export default function specific(n){
    console.log("Entering ",n);
    if(n==1){console.log("Exiting ",n); return 1;}
    let temp = specific(n-1);
    console.log("Exiting ",n);
    return n * temp;
}