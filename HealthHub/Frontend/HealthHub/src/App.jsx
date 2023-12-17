import { useState } from "react";

import "./App.css";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token,setToken] = useState();
  const [userInfo,setUserInfo] = useState(null);

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
    console.log(loginData)
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

      if (response.ok) {
        const data = await response.text();
        setToken(data);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("There was an error!", error.Message);
    }
  };
  const fetchUser = async () => {
    try{
      const response = await fetch("https://localhost:7016/api/v1/Authentication/currentuserinfo",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }
      );
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.userName);
      }
    }catch (error) {
      console.error("There was an error!", error);
    }
  }
  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button onClick={fetchLogin}>Login</button>
        <br />
        {userInfo || <p>User info not fetched</p>}
        <br />
        <button onClick={fetchUser}>Fetch User</button>

      </div>
    </>
  );
}

export default App;
