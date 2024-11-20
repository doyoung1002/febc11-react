import Counter from '@components/Counter';
import Header from '@components/Header';

function App() {
  return (
    <div id='app'>
      <Header />
      {/* 컴포넌트 태그 사이에 기본값으로 설정할 수 있음 children으로 */}
      <Counter>5</Counter>
    </div>
  );
}

export default App;
