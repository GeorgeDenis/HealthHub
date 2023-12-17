import { useState } from "react";

import "./App.css";

function App() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchLogin = async () => {
    const loginData = {
      username,
      password,
    };
    try {
      const response = await fetch(
        "https://localhost:7016/api/v1/Authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      console.log(response)

      if (response.ok) {
        const data = await response.text();
        console.log(`JWT Token ${data}`);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <br />
        <button onClick={fetchLogin}>Login</button>
      </div>
    </>
  );
}

export default App;
