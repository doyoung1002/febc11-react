var item = { no: 1, todo: '두부', done: true };

// 1. 대입 연산자 newItem 생성
var newItem = item;

// 2. Object.assign() 사용해서 속성 추가
// 기존에 있던 속성과 다른 속성을 합칠 때 사용함
// Object.assign(target, ...source): target 객체에 source 객체들의 속성을 추가해서 target을 반환
// 여러 속성을 item에 넣어주고 그것을 newItem으로 반환
var newItem = Object.assign(item, { delete: true }, {}, {})
var newItem = Object.assign({}, item, { delete: true })
// Item에 있는 속성을 {} 빈 객체에 병합하고, 반환하라

// 3. Item의 속성으로 새로운 객체 생성
var newItem = { no: item.no, done: item.done, todo: item.todo };

// 4. 전개 연산자를 이용한 복사
var newItem = { ...item, done: false };

// item, newItem 비교
// newItem.done = false;
console.log(item, newItem);
console.log('같은 객체임?', item === newItem);