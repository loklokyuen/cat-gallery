import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'


function App() {
  const theme = createTheme({
    palette:{
      primary: {
        main: '#7886C7',
        light: '#7886C7',
        dark: '£2D336B'
      },
      secondary: {
        main: '#A9B5DF',
      },
      background: {
        default: '#A9B5DF',
        paper: '#FFF2F2'
      },
      text: {
        primary: '#2D336B',
        secondary: '#2D336B'
      }
    },
  })

  return (
    <>
      <ThemeProvider theme={theme} >
      <CssBaseline /> 
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
