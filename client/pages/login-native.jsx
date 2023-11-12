import React from 'react';

function LoginNative() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 " style={{ backgroundColor: '#28282B' }}> 
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md"> 
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username:
            <input type="text" name="username" required className="border py-2 px-4 block w-full rounded-md" />
          </label>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password:
            <input type="password" name="password" required className="border py-2 px-4 block w-full rounded-md" />
          </label>
        </div>
        <button type="submit" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-blue-700 w-full">Log in</button>
      </form>
    </div>
  );
}

export default LoginNative;
