import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = "https://6850bd40e7c42cfd17997288.mockapi.io/product";

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setProductos(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los productos",
                icon: "error",
            });
        }
    };

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });
            if (!respuesta.ok) throw new Error("Error al agregar producto");

            await respuesta.json();

            Swal.fire({
                title: ":)!",
                text: "Producto agregado correctamente!",
                icon: "success",
            });
            cargarProductos();
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error",
                text: "No se pudo agregar el producto",
                icon: "error",
            });
        }
    };

    const actualizarProducto = async (producto) => {
        try {
            const respuesta = await fetch(`${apiUrl}/${producto.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });
            if (!respuesta.ok) {
                throw new Error("Error al actualizar el producto");
            }

            await respuesta.json();

            Swal.fire({
                title: ":)!",
                text: "Producto actualizado correctamente",
                icon: "success",
            });
            cargarProductos();
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el producto",
                icon: "error",
            });
        }
    };

    const eliminarProducto = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                const respuesta = await fetch(`${apiUrl}/${id}`, {
                    method: "DELETE",
                });
                if (!respuesta.ok) throw new Error("Error al eliminar");

                Swal.fire({
                    title: "Eliminado",
                    text: "Producto eliminado correctamente",
                    icon: "success",
                });
                cargarProductos();
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al eliminar el producto",
                    icon: "error",
                });
            }
        }
    };

    return (
        <AdminContext.Provider
            value={{
                productos,
                loading,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
