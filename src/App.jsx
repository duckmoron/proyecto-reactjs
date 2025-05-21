import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

function App() {
  const [cart, setCart] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(()=>{
    fetch('/data/data.json')
    .then(respuesta => respuesta.json())
    .then(datos =>{
      setTimeout(()=>{
        setProductos(datos)
        setCargando(false)
      },2000)
    })
    .catch(error => {
      console.log('Error',error)
      setCargando(false)
      setError(true)
    })

  },[])
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home productos={productos} cargando={cargando}/>} />

          <Route path='/acercade' element={<AcercaDe/>} />

          <Route path='/productos' element={<GaleriaDeProductos/>} />

          <Route path='/contacto' element={<Contacto/>} />

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
