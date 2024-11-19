import PropTypes from 'prop-types';
import { Component } from 'react';

class ClickMe extends Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  // 1-1(1은 생성) - Mount 과정(최초) , (2는 업데이트)
  constructor(props) {
    console.log('1-1 constructor 호출됨.');
    super(props); // 필수로 작성
    this.state = { count: props.level || 1 };
  }

  // 1-2(1은 생성) / 2-1(2는 업데이트)
  static getDerivedStateFromProps(props, state) {
    console.log('1-2/2-1 getDerivedStateFromProps 호출됨.');

    return null;
  }

  // 2-2(2는 업데이트)
  shouldComponentUpdate(nextProps, nextState) {
    console.log('2-2 shouldComponentUpdate 호출됨.');
    return true;
  }

  // 1-3(1은 생성) / 2-3(2는 업데이트)
  render() {
    console.log('1-3/2-3 render 호출됨.');
    return (
      <>
        <div>
          클릭 횟수 X {this.props.level || 1}: {this.state.count}
          <button onClick={this.handleClick}>클릭</button>
        </div>
      </>
    );
  }

  // 1-4(1은 생성)
  componentDidMount() {
    console.log('1-4 componentDidMount 호출됨.');
  }

  // 2-4(2는 업데이트)
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('2-4 getSnapshotBeforeUpdate 호출됨.');
    return 'hello';
  }

  // 2-5(2는 업데이트)
  componentDidUpdate() {
    console.log('2-5 componentDidUpdate 호출됨.');
  }

  // 3-1(컴포넌트가 제거 - unmount)
  componentWillUnmount() {
    console.log('3-1 componentWillUnmount 호출됨.');
  }
}

ClickMe.prototypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>03 클래스 컴포넌트 - 컴포넌트의 라이플 사이클</h1>
        <ClickMe level={2} />
      </div>
    );
  }
}

export default Parent;
