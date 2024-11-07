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
        const value = props[attrName];
        if (attrName.toLowerCase().startsWith('on')) {
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      } else if (typeof child === 'function') {
        child = child();
      }
      elem.appendChild(child);
    }

    return elem;
  },

  // 루트 노드를 관리하는 객체를 생성
  // createRoot(document.getElementById('root')).render(App);
  // 클루저를 사용하게 됨
  createRoot: (rootNode) => {
    return {
      // 루트노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링 한다.
      render(appFn) {
        rootNode.appendChild(appFn());
      }
    };
  }
};

export default index;