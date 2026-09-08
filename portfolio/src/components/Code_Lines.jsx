import React from "react";
 
// codeSnippets.js

export const codeForAll = {
  FOR_LOOP: `for (let i = 0; i < n; i++) {
  console.log(i);
}`,

  WHILE_LOOP: `let i = 0;
while (i < n) {
  console.log(i);
  i++;
}`,

  SELECTION:`const arr = [1, 2, 3, 4, 5];
const n = arr.length; 

for(let i = 0; i < n; i++){
    console.log(arr[i]);
    if(i == 2){
    console.log("condition met!")
    }
    else{
        continue;
    }
}`,

  UPDATION:`const arr = [1, 2, 3, 4, 5];
const n = arr.length; 

for(let i = 0; i < n; i++){
    if(i == 2){
        arr[i] = 7;
    }
}`,

  LINEAR_SEARCH: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,

  BINARY_SEARCH: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,

  BUBBLE_SORT: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,

  SELECTION_SORT: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,

  INSERTION_SORT: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,

  SLL_TRAVERSAL:`const sll = new SinglyLinkedList();

  for(let i = 0; i < 5; i++){
              sll.add(i);
  }

  for(let i = 0; i < 5; i++){
              sll.pop();
}`,

  DLL_TRAVERSAL:`const dll = new DoublyLinkedList();

  for(let i = 0; i < 5; i++){
              dll.add(i);
  }

  for(let i = 0; i < 5; i++){
              dll.pop();
}`,


};