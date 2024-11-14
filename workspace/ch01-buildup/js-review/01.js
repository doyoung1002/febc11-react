var arr = [10, 20, 30];

// 각 요소의 제곱값으로 구성된 새로운 배열 생성
var arr2 = [100, 400, 900];

// for
var arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i] * arr[i]);
}

// for of(ES6)
var arr2 = [];
for (let item of arr) {
  arr2.push(item * item);
}

// Array.prototype.forEach(), ES5
var arr2 = [];
// index 안쓰면 생략 가능
arr.forEach(function (item, index) {
  arr2.push(item * item);
});

//  Array.prototype.map(), ES6
// map() 메서드는 배열을 순회하며 각 요소에 대해 콜백함수를 실행하고, 그 결과를 자동으로 새로운 배열에 저장해서 반환한다.
// 원본 배열은 변경하지 않는다.
// 항상 새로운 배열을 반환함
// push 대신 return의 형태로 요소를 반환해야 한다.
var arr2 = arr.map(function (item) {
  return item * item;
});

// Arrow function, ES6
var arr2 = [];
arr.forEach((item, index) => arr2.push(item * item));

// map
var arr2 = arr.map((item) => item * item);

console.log(arr2); // [100, 400, 900]
