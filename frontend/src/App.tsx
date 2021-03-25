import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Content} from "./features/content/Content";
import {isAuthenticated} from "./features/auth/authSlice";
import {useSelector} from "react-redux";
import {Auth} from "./features/auth/Auth";


function App() {
  const loggedIn = useSelector(isAuthenticated);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          {!loggedIn && <Auth />}
          {loggedIn && <Content />}
      </header>
    </div>
  );
}

export default App;
