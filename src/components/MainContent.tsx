import React, { useState } from 'react';

const MainContent: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <main>
      <p>You're not dead yet!</p>
      <button onClick={() => setCount(count + 1)}> Count: {count}</button>
    </main>
  );
};

export default MainContent;

