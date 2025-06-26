import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import Contacto from './pages/Contacto'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import DetallesProductos from './components/DetallesProductos'
import Checkout from "./pages/Checkout";
import Login from './pages/Login'
import RutaProtegida from './auth/RutaProtegida'
import { useAuth } from './context/AuthContext'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '@fontsource/inter'; // Inter como fuente base
import '@fontsource/domine'; // Domine para números

function App() {

  const { isAuthenticated } = useAuth();

  return (
    <>
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/acercade' element={<AcercaDe />} />

          <Route path='/productos' element={<GaleriaDeProductos />} />

          <Route path='/productos/:id' element={<DetallesProductos />} />

          <Route path='/contacto' element={<Contacto />} />

          <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin /> </RutaProtegida>} />

          <Route path='/login' element={<Login />} />

          <Route
              path="/checkout"
              element={
                  <RutaProtegida isAuthenticated={isAuthenticated} requireCart={true}>
                      <Checkout />
                  </RutaProtegida>
              }
          />
          
          <Route path='*' element={<NotFound />} />

        </Routes>
    </>
  )
}

export default App
