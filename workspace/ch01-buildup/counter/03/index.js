const index = {
  // 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환
  // <button type="button" onclick="handleUp()">+</button>
  // createElement('button', {type: 'button', onclick: 'handleUp()'}, '+');
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      // 배열이면 for of
      // 객체면 for in

      // 객체 속성의 개수만큼 
      for (const attrName in props) {
        elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    }

    return elem;
  }
};

export default index;