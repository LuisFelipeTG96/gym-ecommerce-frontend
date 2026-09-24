import { useState } from 'react';
import './ProductCard.css'

function ProductCard({ product, onAgregar }) {
    const [cantidad, setCantidad] = useState(1);

    return (
        <article className="product-card">
            <img src={product.image} alt={product.name} className="product-card-img"/>
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-info">{product.description}</p>
            <p className="product-card-tags">{product.gender} - {product.ageGroup} - Talla: {product.size}</p>
            <div className="product-card-price-row">
                <p className="product-card-price">S/. {product.price.toFixed(2)}</p>
                <div className="product-card-qty">
                    <label htmlFor={`cantidad-${product.id}`}>Cantidad</label>
                    <input
                        type="number"
                        id={`cantidad-${product.id}`}
                        value={cantidad}
                        min="1"
                        className="qty-input"
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>
            </div>
            <button onClick={() => onAgregar(product, cantidad)} className="btn btn-primary">Agregar al Carrito</button>
        </article>
    );
}

export default ProductCard;
