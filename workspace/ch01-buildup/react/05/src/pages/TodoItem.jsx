function TodoItem({ item, toggleDone, deleteItem }) {
  return (
    <li>
      <span>{item._id}</span>
      {/* 이벤트가 발생하면 그때 호출, 함수만 호출하게되면 return 값이 없기때문에 undefined로 나온다. 그래서 함수 객체를 전달해줘야 한다. */}
      {/* toggleDone(item._id)로 전달하면 이는 return값이 없다. 이벤트 리스너는 함수를 등록하는 것이기 때문에, 함수 호출하는 코드를 작성하면 안된다. */}
      <span onClick={() => toggleDone(item._id)}>{item.done ? <s>{item.title}</s> : item.title}</span>
      <button type='button' onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
