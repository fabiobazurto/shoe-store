import logo from './logo.svg';
import './App.css';

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import {
  Avatar,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";

//Routing
import { Route, Routes } from "react-router-dom";

//Components
import Nav from "./components/Nav/Nav";
import StoresBoard from './components/StoresBoard/StoresBoard';
import About from './components/About/About';


function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route path="/" element={<StoresBoard />} />
      <Route path="/log" element={<About />} />      
      </Routes>
      </div>
  );
}

export default App;
