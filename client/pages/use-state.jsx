import React, { useState } from 'react';

function UseStatePage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <p>Current counter value: {count}</p>
    </div>
  );
}

export default UseStatePage;