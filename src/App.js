import 'App.css';
import React from 'react';
import Home from 'pages/Home/Home.js';
import GradientDescent from 'pages/algorithms/gradient_descent/GradientDescent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './components/ScrollToTop.js';
import SignIn from 'pages/sign/SignIn.js';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard.js';
import Algorithms from 'pages/algorithms/Algorithms.js';

const theme = createTheme({});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes >
          <Route path='/' exact element={<Home />} />
          <Route path='/algorithms' element={<Algorithms />} />
          <Route path='/algorithms/gd' element={<AlgorithmsDashboard component={<GradientDescent/>} />} />
          <Route path='/signin' element={<SignIn/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
