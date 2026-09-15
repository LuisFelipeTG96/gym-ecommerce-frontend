import { createContext, useContext, useEffect, useState } from 'react';
import { dataProductos } from '../data/products';


const CartContext = createContext();

export function CartProvider({ children }) {

    const [carrito, setCarrito] = useState(() => {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (id, cantidad = 1) => {

        if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

        setCarrito((prevCarrito) => {
            const exists = prevCarrito.find((x) => x.id === id);
            if (exists) {
                return prevCarrito.map((x) => {
                    return x.id === id ? { ...x, cantidad: x.cantidad + cantidad} : x
                });
            }

            const producto = dataProductos.find((x) => x.id === id);
            return [...prevCarrito, { id: producto.id, name: producto.name, price: producto.price, image: producto.image, cantidad: cantidad }];
        });
    };

    const eliminarProductoCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((x) => x.id !== id));
    };

    const actualizarCantidad = (id, nuevaCantidad) => {

        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

        setCarrito((prevCarrito) => {
            return prevCarrito.map((x) => (x.id === id ? { ...x, cantidad: nuevaCantidad } : x))
        });
    };

    const vaciarCarrito = () => setCarrito([]);

    const precioTotalCarrito = carrito
        .map((x) => x.price * x.cantidad)
        .reduce((a, b) => a + b, 0);

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarProductoCarrito, actualizarCantidad, vaciarCarrito, precioTotalCarrito }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}
