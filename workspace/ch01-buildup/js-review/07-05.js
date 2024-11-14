// Array.prototype.reduce(callback[, initialValue]): 배열의 각 요소에 대해 콜백 함수를 싫행
// callback(accumulator-누적값, currentValue-현재값, index-인덱스, array-원본 배열)
// initialValue가 주어지면 누적값의 초기값으로 사용하고
// initialValue가 주어지지 않으면 배열의 첫 번째 요소가 누적값의 초기값으로 사용되고 두 번째 요소부터 콜백 함수가 호출

// 배열 요소 중에 홀수의 합계
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = array.reduce((acc, num) => {
  if (num % 2 !== 0) {
    return acc + num; // 홀수일 때 num을 누적해서 반환
  } else {
    return acc; // 짝수일 때 이전 sum을 그대로 반환
  }
}, 0);

var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum; // 홀수일때는 누적한다.
}, 0);

var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum, 0));

var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result);
