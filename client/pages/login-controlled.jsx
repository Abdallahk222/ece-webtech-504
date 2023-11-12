import React, { useState } from "react";

function LoginControlled() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${data.username}, Password: ${data.password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginControlled;
