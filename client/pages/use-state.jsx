import React, { useState } from 'react';

function UseStatePage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button className="block bg-[#085D22] text-[white] py-2 px-2 hover:bg-[#4E6EDD] hover:text-[black]" onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <p>Current counter value: {count}</p>
    </div>
  );
}

export default UseStatePage;