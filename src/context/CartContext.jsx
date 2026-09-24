import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch, apiFetchWithCsrf } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

function mapCarritoDetalle(detalle) {
    const producto = detalle.producto || {};
    return {
        id: detalle.id_carrito_detalle,
        idProducto: detalle.id_producto,
        name: producto.nombre,
        price: producto.precio,
        image: producto.imagen_url,
        description: producto.descripcion,
        gender: producto.genero === 'hombre' ? 'Hombre' : producto.genero === 'mujer' ? 'Mujer' : 'Unisex',
        ageGroup: producto.grupo_edad === 'nino' ? 'Niño' : 'Adulto',
        size: producto.talla,
        cantidad: detalle.cantidad,
    };
}

export function CartProvider({ children }) {

    const { usuarioLogueado } = useAuth();

    const [carrito, setCarrito] = useState(() => {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    });

    useEffect(() => {
        if (!usuarioLogueado) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, usuarioLogueado]);

    const cargarCarritoBackend = async () => {
        try {
            const data = await apiFetch('/carrito');
            const detalles = data?.carritoDetalles || [];
            setCarrito(detalles.map(mapCarritoDetalle));
        } catch {
            setCarrito([]);
        }
    };

    const migrarCarritoLocal = async () => {
        const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];

        try {
            for (const item of carritoLocal) {
                await apiFetchWithCsrf('/carrito', {
                    method: 'POST',
                    body: JSON.stringify({ id_producto: item.id, cantidad: item.cantidad }),
                });
            }
        } catch {
            // si falla algun item, igual seguimos y cargamos lo que sí se migró
        }

        if (carritoLocal.length > 0) {
            localStorage.removeItem('carrito');
        }

        await cargarCarritoBackend();
    };

    useEffect(() => {
        if (usuarioLogueado) {
            migrarCarritoLocal();
        } else {
            setCarrito(JSON.parse(localStorage.getItem('carrito')) || []);
        }
    }, [usuarioLogueado]);

    const agregarAlCarrito = async (producto, cantidad = 1) => {

        if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

        if (usuarioLogueado) {
            await apiFetchWithCsrf('/carrito', {
                method: 'POST',
                body: JSON.stringify({ id_producto: producto.id, cantidad }),
            });
            await cargarCarritoBackend();
            return;
        }

        setCarrito((prevCarrito) => {
            const exists = prevCarrito.find((x) => x.id === producto.id);
            if (exists) {
                return prevCarrito.map((x) => (
                    x.id === producto.id ? { ...x, cantidad: x.cantidad + cantidad } : x
                ));
            }

            return [...prevCarrito, {
                id: producto.id,
                name: producto.name,
                price: producto.price,
                image: producto.image,
                description: producto.description,
                gender: producto.gender,
                ageGroup: producto.ageGroup,
                size: producto.size,
                cantidad,
            }];
        });
    };

    const eliminarProductoCarrito = async (id) => {
        if (usuarioLogueado) {
            await apiFetchWithCsrf(`/carrito/${id}`, { method: 'DELETE' });
            await cargarCarritoBackend();
            return;
        }
        setCarrito((prevCarrito) => prevCarrito.filter((x) => x.id !== id));
    };

    const actualizarCantidad = async (id, nuevaCantidad) => {

        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

        if (usuarioLogueado) {
            await apiFetchWithCsrf(`/carrito/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ cantidad: nuevaCantidad }),
            });
            await cargarCarritoBackend();
            return;
        }

        setCarrito((prevCarrito) => (
            prevCarrito.map((x) => (x.id === id ? { ...x, cantidad: nuevaCantidad } : x))
        ));
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
