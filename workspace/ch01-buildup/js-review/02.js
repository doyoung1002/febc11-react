var itemList = [
  { no: 1, todo: '두부', done: true },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: true },
];

console.log(itemList[0]);
console.log(itemList[1]);

var [first, second] = itemList;
console.log(first);
console.log(second);

// var state = useState(0);
// console.log(state[0]);
// console.log(state[1](state[0] + 1));

// var [count, setCount] = useState(0);
// console.log(count);
// console.log(setCount(count + 1));

console.log(second.no, second.todo);
var { no, todo, done } = second;
console.log(no, todo, done);

// function App(props){};

// function App({no, todo}){};

// 구조분해할당에서 객체를 꺼내쓸 때는 순서는 상관이 없다.
// 하지만 배열을 할 때는 index가 있기때문에 순서가 중요하다.
