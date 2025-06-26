import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const location = useLocation(); // ✅ Hook para detectar navegación
    const apiUrl = "https://6850bd40e7c42cfd17997288.mockapi.io/product";

    // Esta función reutilizable carga los productos desde la API
    const fetchProductos = async () => {
        try {
            setCargando(true);
            const respuesta = await fetch(apiUrl);
            const datos = await respuesta.json();
            setProductos(datos);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar productos", error);
            setError(true);
            setCargando(false);
        }
    };

    // Cargar al montar y cada vez que cambia la ruta
    useEffect(() => {
        fetchProductos();
    }, [location.pathname]);

    if (error) {
        return (
            <p>
                Ocurrió un error al cargar los productos. Por favor intenta
                nuevamente.
            </p>
        );
    }

    const productosFiltrados = productos.filter((producto) =>
        producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleAddToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: product.cantidad }
                        : item
                )
            );
        } else {
            toast.success(
                <div className="flex items-center gap-3">
                    <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-10 h-10 object-cover rounded"
                    />
                    <span>
                        El producto <strong>{product.nombre}</strong> se ha
                        agregado al carrito.
                    </span>
                </div>,
                {
                    className:
                        "bg-green-100 text-green-900 border border-green-400 rounded-md shadow-md",
                    bodyClassName: "text-sm",
                    position: "top-center",
                }
            );
            setCart([...cart, { ...product, cantidad: product.cantidad }]);
        }
    };

    const handleDeleteFromCart = (product) => {
        toast.error(
            <div className="flex items-center gap-3">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-10 h-10 object-cover rounded"
                />
                <span>
                    El producto <strong>{product.nombre}</strong> se ha
                    eliminado del carrito.
                </span>
            </div>,
            {
                className:
                    "bg-red-100 text-red-900 border border-red-400 rounded-md shadow-md",
                bodyClassName: "text-sm",
                position: "top-center",
            }
        );
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === product.id
                        ? item.cantidad > 1
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : null
                        : item
                )
                .filter((item) => item !== null)
        );
    };

    const updateQuantity = (id, nuevaCantidad) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

        const producto = cart.find((item) => item.id === productId);
        if (producto) {
            toast.error(
                <div className="flex items-center gap-3">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-10 h-10 object-cover rounded"
                    />
                    <span>
                        Se eliminó <strong>{producto.nombre}</strong> del
                        carrito.
                    </span>
                </div>,
                {
                    className:
                        "bg-red-100 text-red-900 border border-red-400 rounded-md shadow-md",
                    bodyClassName: "text-sm",
                    position: "top-center",
                }
            );
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                productos,
                cargando,
                error,
                handleAddToCart,
                handleDeleteFromCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                productosFiltrados,
                busqueda,
                setBusqueda,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
