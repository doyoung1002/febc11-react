// strings 배열 사이에 <strong>태그를 씌운 values 값을 채워 넣어서 하나의 문자열로 반환한다.
function sayHello(strings, ...values) {
  console.log(strings);
  console.log(values);
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    const value = values[i] ? `<strong>${values[i]}</strong>` : '';
    result += strings[i] + value;
  }
  return result;
}

// sayHello(평문 문자 배열, 강조 문자 배열)
// 안녕하세요. 무지님, 오늘 날씨는 맑음 입니다.
//  => 안녕하세요. <strong>무지</strong>님, 오늘 날씨는 <strong>맑음</strong>입니다.
const result1 = sayHello(['안녕하세요. ', '님, 오늘 날씨는 ', ' 입니다.'], '무지', '맑음');
console.log(result1);

const result2 = sayHello(
  ['안녕하세요. ', '님. 오늘 날씨는 ', ' 입니다. 즐거운 ', ' 보내세요.'],
  '데이지',
  '흐림',
  '하루'
);
// => 안녕하세요. <strong>데이지</strong>님. 오늘 날씨는 <strong>흐림</strong> 입니다. 즐거운 <strong>하루</strong> 보내세요.
console.log(result2);

const userName = '무지';
const weather = '맑음';
const str = `안녕하세요. ${userName}님, 오늘 날씨는 ${weather} 입니다.`;

const result3 = sayHello(['안녕하세요. ', '님, 오늘 날씨는 ', ' 입니다.'], userName, weather);

// 평문자와 값이 나눠지면서 위와 같은 것과 같다.
// 텍스트 배열, 변수의 배열이 나눠지고, sayHello로 인자로 넘어간다.
// Tagged Template
const result4 = sayHello`안녕하세요. ${userName}님, 오늘 날씨는 ${weather} 입니다.`;
console.log('result4', result4);
