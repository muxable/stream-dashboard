import React from 'react';
import './App.css';
import { Login } from './component/Login';
import { SignUp } from './component/SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
        <br />
        <br />
        <SignUp></SignUp>
      </header>
    </div>
  );
}

export default App;
