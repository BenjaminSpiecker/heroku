import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
function App() {
  const [prof, renderProf] = useState([])
  async function fetchProfessor(){
    const professors = await axios.get(`http://localhost:${process.env.PORT || `3000`}/profesores`)
    console.log(professors.data)
    renderProf(professors.data)
    console.log(professors)
  }
  return (
    <div>

    <Route exact path="/hola"><div></div></Route>
    <Route exact path="/">
      <Link to="/hola">holaaaaaa</Link>
      <button onClick={() => fetchProfessor()}></button>

      {prof.length ? prof.map(p => <span>{p.name}</span>) : null}

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Route>
    </div>
  );
}

export default App;
