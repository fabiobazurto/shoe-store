import logo from './logo.svg';
import './App.css';

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";

//Routing
import { Route, Routes } from "react-router-dom";

//Components
import Nav from "./components/Nav/Nav";
import Transfer from './components/Transfer/Transfer';
import Dashboard from './components/Dashboard/Dashboard';
import Log from './components/Log/Log';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/logs" element={<Log />} />	  
      </Routes>
      </div>
  ); 
}

export default App;
