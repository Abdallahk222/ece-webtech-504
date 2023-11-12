import React, { useState } from 'react';

function UseStatePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen justify-center items-center " style={{ backgroundColor: '#28282B' }}>
      <p className='mr-10'>You clicked {count} times</p>
      <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-blue-700 " onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <p className='ml-10'>Current counter value: {count}</p>
    </div>
  );
}

export default UseStatePage;