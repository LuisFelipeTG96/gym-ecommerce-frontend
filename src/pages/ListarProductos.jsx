import { dataProductos } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function ListarProductos() {

    const { agregarAlCarrito } = useCart();
    const [filtro, setFiltro] = useState('todos');

    const productosFiltrados = dataProductos.filter((p) => {

        if (filtro === 'todos') return true;
        if (filtro === 'nino') return p.ageGroup === 'Niño';
        if (filtro === 'hombre') return p.ageGroup !== 'Niño' && (p.gender === 'Hombre' || p.gender === 'Unisex');
        if (filtro === 'mujer') return p.ageGroup !== 'Niño' && (p.gender === 'Mujer' || p.gender === 'Unisex');
    });

    return (
        <div className="page-container">
            <p className="brand-banner">Machamp Supplements</p>
            <h1>Catálogo de Productos</h1>
            <div className="filtros">
                <button onClick={() => setFiltro('todos') } className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-secondary'}`}>Todos</button>
                <button onClick={() => setFiltro('hombre') } className={`btn ${filtro === 'hombre' ? 'btn-primary' : 'btn-secondary'}`}>Hombres</button>
                <button onClick={() => setFiltro('mujer') } className={`btn ${filtro === 'mujer' ? 'btn-primary' : 'btn-secondary'}`}>Mujeres</button>
                <button onClick={() => setFiltro('nino') } className={`btn ${filtro === 'nino' ? 'btn-primary' : 'btn-secondary'}`}>Niños</button>
            </div>
            <div className="products-grid">
                {productosFiltrados.map((product) => (
                    <ProductCard key={product.id} product={product} onAgregar={agregarAlCarrito} />
                ))}
            </div>
        </div>
      );
}

export default ListarProductos;
