import React, { useState, useEffect, useContext } from "react";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const {setIsAuth} = useContext(CartContext)
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [openEditor, setOpenEditor] = useState(false)
    const apiUrl = 'https://6850bd40e7c42cfd17997288.mockapi.io/product'
    const navigate = useNavigate()

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const cargarProductos = async()=>{
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            setProductos(data)
        } catch (error) {
            console.log('Error al cargar productos ', error);
            
        }
    }

    const agregarProducto = async (producto) =>{
        try{
            const respuesta = await fetch(apiUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
        })
        if(!respuesta.ok){
            throw new Error('Error al agregar producto')
        }
        const data = await respuesta.json()
        alert('Producto agregado correctamente')
        cargarProductos()
        setOpen(false)
        }catch(error){
            console.log(error.message);
            
        }
    }

    const actulizarProducto = async(producto) =>{
        try {
            const respuesta = await fetch(`${apiUrl}/${producto.id}`,
                {method:'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
                })
                if(!respuesta.ok) throw Error ('Error al actualizar el producto')
                    const data = await respuesta.json()
                alert('Producto actualizado correctamente')
                setOpenEditor(false)
                setSeleccionado(null)
                cargarProductos()
        } catch (error) {
            console.log(error.message);
            
        }
    }

    const eliminarProducto = async (id)=>{
        const confirmar = window.confirm('Estas seguro de eliminar el producto?')
        if (confirmar) {
            try{
                const respuesta = await fetch(`${apiUrl}/${id}`,{
                    method:'DELETE',
                })
                if(!respuesta.ok) throw Error('Error al eliminar')
                alert('Producto Eliminado correctamente')
                cargarProductos()
            }catch(error){
                alert('Hubo un problema al eliminar el producto')
            }
        }
    }



    return (
        <div className="container">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <nav>
                        <ul className="nav">
                            <li className="navItem">
                                <button className="navButton" onClick={() => {
                                    setIsAuth(false);
                                    navigate('/');
                                    localStorage.removeItem('isAuth');
                                }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </li>
                            <li className="navItem">
                                <a href="/admin">Admin</a>
                            </li>
                        </ul>
                    </nav>
                    <h1 className="title">Panel Administrativo</h1>

                    <ul className="list">
                        {productos.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.imagen}
                                    alt={product.nombre}
                                    className="listItemImage"
                                />
                                <span>{product.nombre}</span>
                                <span>${product.precio}</span>
                                <div>
                                    <button className="editButton" onClick={()=>{
                                        setOpenEditor(true)
                                        setSeleccionado(product)
                                    }}>Editar</button>

                                    <button className="deleteButton" onClick={()=> eliminarProducto(product.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button onClick={()=> setOpen(true)}>Agregar producto nuevo</button>
            {open && (<FormularioProducto onAgregar={agregarProducto}/>)}
            {openEditor && (<FormularioEdicion productoSeleccionado={seleccionado} onActualizar={actulizarProducto}/>)}
        </div>
    );
};

export default Admin;
