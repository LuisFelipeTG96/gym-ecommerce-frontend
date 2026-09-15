import { dataProductos } from '../../data/products';
import './CartItemCard.css'

function CartItemCard({ item, onEliminar, onCantidadChange }) {

    const producto = dataProductos.find((p) => p.id === item.id);
    const subtotal = item.price * item.cantidad;

    return (
        <article className="product-card">
            <img src={item.image} alt={item.name} className="product-card-img" />
            <h3 className="product-card-name">{item.name}</h3>
            <p className="product-card-info">{producto.description}</p>
            <p className="product-card-tags">{producto.gender} - {producto.ageGroup} - Talla: {producto.size}</p>
            <div className="product-card-price-row">
                <p className="product-card-info">S/. {item.price.toFixed(2)}</p>
                <div className="product-card-qty">
                    <label htmlFor={`qty-${item.id}`}>Cantidad</label>
                    <input
                        type="number"
                        id={`qty-${item.id}`}
                        value={item.cantidad}
                        min="1"
                        className="qty-input"
                        onChange={(e) => onCantidadChange(item.id, Number(e.target.value))}
                    />
                </div>
            </div>
            <p className="product-card-price">Subtotal: S/. {subtotal.toFixed(2)}</p>
            <button onClick={() => onEliminar(item.id)} className="btn btn-secondary">Eliminar</button>
        </article>
    );
}

export default CartItemCard;
