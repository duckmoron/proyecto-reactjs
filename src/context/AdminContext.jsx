import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [openEditor, setOpenEditor] = useState(false)
    const apiUrl = 'https://6850bd40e7c42cfd17997288.mockapi.io/product'

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
        <AdminContext.Provider value={{
            productos,
            loading,
            open,
            setOpen,
            openEditor,
            setOpenEditor,
            seleccionado,
            setSeleccionado,
            agregarProducto,
            actulizarProducto,
            eliminarProducto,
        }}>
            {children}
        </AdminContext.Provider>
    )

}

