import PropTypes from 'prop-types';
import { Component } from 'react';

class ClickMe extends Component {
  // state/setState는 부모에 정의되어 있는 이름
  // 상태는 state 변수 하나만 사용 가능해서 여러 개의 상태를 관리하려면 객체로 지정
  // 함수형에서는 state 변수를 여러 개 지정 가능(useState 훅)
  state = { count: 0 };

  // 생성자 함수 (Props를 기준으로 state를 초기화 경우 등에서 작성)
  constructor(props) {
    // 부모 클래스의 생성자를 통해 this가 초기화 되므로
    // super()를 호출해야 자식 클래스에서 this를 사용할 수 있다.
    // super(props)를 호출해야 자식 클래스에서 this.props를 사용할 수 있다.
    super(props); // 필수로 작성
    this.state = { count: props.level || 1 };
  }

  // arrow function으로 작성해야 this.state 등에 접근 가능
  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  increase = () => {};
  render() {
    return (
      <>
        <div>
          클릭 횟수 X {this.props.level || 1}: {this.state.count}
          <button onClick={this.handleClick}>클릭</button>
        </div>
      </>
    );
  }
}

ClickMe.prototypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01 클래스 컴포넌트</h1>
        <ClickMe level={2} />
        <ClickMe level={5} />
        <ClickMe />
      </div>
    );
  }
}

export default Parent;
