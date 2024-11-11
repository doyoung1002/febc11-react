import Index from '../index.js';
import Header from './Header.js';
import Counter from './Counter.js';


// 애플리케이션의 시작점
function App() {
  return (
    Index.createElement('div', { id: 'app' }, Header, Counter)
  );
}

export default App;