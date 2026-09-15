import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard/CartItemCard';

function Carrito() {

    const { carrito, eliminarProductoCarrito, actualizarCantidad, precioTotalCarrito } = useCart();

    return (
        <div className="page-container">
            <h1>Carrito de compras</h1>
            {carrito.length === 0 ? (
                <div className="empty-state">
                    <p className="cart-empty">Tu carrito está vacío</p>
                    <Link to="/" className="btn btn-primary">Ver productos</Link>
                </div>
            ) : (
                <>
                    <div className="products-grid">
                        {carrito.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onEliminar={eliminarProductoCarrito}
                                onCantidadChange={actualizarCantidad}
                            />
                        ))}
                    </div>
                    <div className="cart-sticky-bar">
                        <div className="cart-summary">TOTAL: S/. {precioTotalCarrito.toFixed(2)}</div>
                        <div className="cart-actions">
                            <Link to="/" className="btn btn-secondary">Atrás</Link>
                            <Link to="/finalizarPedido" className="btn btn-primary">Continuar</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default Carrito;
