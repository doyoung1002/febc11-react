// 이렇게 밖에서도 사용 가능, 충돌 가능성이 있음
// let _root;
// let _stateValue;

const index = (() => {
  // 이 안에서 사용하고자 하면 즉시실행 함수
  // 즉시실행함수를 만들게 되면 함수 내부에서 변수를 선언하면 외부에서 영향을 주지 않는다.
  // (() => {})();
  // (function(){})();
  let _root;
  let _stateValue;
  // 변수명 앞에 _ 붙이면 외부애서 사용하지말라는 암묵적인 룰임

  // 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환
  // <button type="button" onclick="handleUp()">+</button>
  // createElement('button', {type: 'button', onclick: 'handleUp()'}, '+');
  const createElement = (tag, props, ...children) => {
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
  };

  // 루트 노드를 관리하는 객체를 생성
  // createRoot(document.getElementById('root')).render(App);
  // 클루저를 사용하게 됨
  const createRoot = (rootNode) => {
    let _appComponent;
    return _root = {
      // 루트노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링 한다.
      render(appFn) {
        // 앞의 값이 null, undefined면 뒤에 값이 반환되고, 그 반대면 앞 값을 반환한다. 이 경우 처음에는 false이다.
        _appComponent = _appComponent || appFn;
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
        }
        rootNode.appendChild(_appComponent());
      }
    };
  };

  // 상태값 관리
  // let [count, setCount] = Index.useState(10);
  const useState = (initValue) => {
    // 최초에 한번만 initValue 값으로 저장하고 useState가 다시 호출되면 initValue는 무시하고 저장된 값을 사용
    if (_stateValue === undefined) {
      // 최초 useState가 호출될 때 한번만 실행
      _stateValue = initValue;
    }

    // setValue(11);
    function setValue(newValue) {
      const oldValue = _stateValue; // 10
      _stateValue = newValue; // 11

      // Object.is는 두 값이 같은지 비교해서 같지 않을 경우에(상태가 변경된 경우) 리렌더링 한다.
      if (!Object.is(oldValue, newValue)) {
        _root.render();
      }
    }

    return [_stateValue, setValue];
  };


  return { createElement, createRoot, useState };
})();


export default index;