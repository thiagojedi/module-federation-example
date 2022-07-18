import { lazy, Suspense } from 'react';

const Counter = lazy(() => import('remote/Counter'));

const App = () => (
  <div className="container">
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Suspense fallback={null}>
      <Counter />
    </Suspense>
  </div>
);

export default App;
