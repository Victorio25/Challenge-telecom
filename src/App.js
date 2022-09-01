import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  NavLink
} from "react-router-dom";
import { PokeList } from './componentes/pokelist/PokeList';
import { Login } from './componentes/login/Login';
export default function App() {
  return (

    <div className="root">


      <Router>
        <div className="container general">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap" rel="stylesheet" />
          <div className="green">
          </div>
          <div className="white">
          </div>


          <Routes>

            <Route path="/pokelist" element={<PokeList></PokeList>} />
            <Route path="/" element={<Login></Login>} />

          </Routes>

        </div>
      </Router>
    </div>
  );
}
