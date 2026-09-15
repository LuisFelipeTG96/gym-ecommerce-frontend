import './CartSummaryItem.css'

function CartSummaryItem({ item }) {
    return (
        <div className="resumen-item">
            <img src={item.image} alt={item.name} className="resumen-item-img" />
            <div className="resumen-item-info">
                <p className="resumen-item-name">{item.name}</p>
                <p className="resumen-item-cantidad">Cantidad: {item.cantidad}</p>
            </div>
        </div>
    );
}

export default CartSummaryItem;
