import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'
import DetallesProductos from './components/DetallesProductos'
import Admin from './pages/Admin'
import Login from './pages/Login'
import RutaProtegida from './auth/RutaProtegida'

function App() {
  const [cart, setCart] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  const [isAuthenticated, setIsAuth] = useState(false)

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
      console.log('Error', error)
      setCargando(false)
      setError(true)
    })

  },[])

  if (error) {
    return <p>Ocurrió un error al cargar los productos. Por favor intenta nuevamente.</p>;
  }
  
  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if(productInCart){
      setCart(cart.map((item) => item.id === product.id ? {...item, quantity:item.quantity+1} : item));
    }else{
      setCart([...cart, {...product,quantity:1}]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return {...item, quantity: item.quantity -1};
          }else{
            return null; // Si quantity es 1, marcamos para eliminar
          }
        }else{
          return item; // Si no es el producto, lo dejamos igual
        }
      }).filter(item => item !== null); // Quitamos los productos nulos
    });
  };


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

          <Route path='/acercade' element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} />} />

          <Route path='/productos' element={<GaleriaDeProductos borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

          <Route path='/productos/:id/' element={<DetallesProductos productos={productos}/>}/>

          <Route path='/contacto' element={<Contacto borrarProducto={handleDeleteFromCart} cart={cart} />} />

          <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin /> </RutaProtegida>} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
