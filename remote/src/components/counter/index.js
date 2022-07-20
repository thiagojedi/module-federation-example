import React from 'react';
import { createRoot } from 'react-dom/client';
import Counter from './Counter';

export const render = (node, props = {}) => {
  const root = createRoot(node);
  root.render(<Counter {...props} />);
}

export default Counter;
