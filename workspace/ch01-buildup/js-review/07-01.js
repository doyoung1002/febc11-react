// Array.prototype.forEach(callback): 배열의 각 요소에 대해 콜백 함수를 싫행
// callback(elem, index)
// 반환값은 없음(리턴 값 x)

// 배열 요소 중 홀수의 합계
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

array.forEach((item) => {
  if (item % 2 !== 0) {
    result += item;
  }
});

console.log(result); // 25
