import ProductCard from '../components/ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { apiFetch } from '../services/api';

function mapProducto(p) {
    return {
        id: p.id_producto,
        name: p.nombre,
        description: p.descripcion,
        price: p.precio,
        image: p.imagen_url,
        gender: p.genero === 'hombre' ? 'Hombre' : p.genero === 'mujer' ? 'Mujer' : 'Unisex',
        ageGroup: p.grupo_edad === 'nino' ? 'Niño' : 'Adulto',
        size: p.talla,
    };
}

function ListarProductos() {

    const { agregarAlCarrito } = useCart();
    const [filtro, setFiltro] = useState('todos');
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        apiFetch('/productos')
            .then((data) => setProductos((data || []).map(mapProducto)))
            .catch(() => setError('No se pudieron cargar los productos'))
            .finally(() => setCargando(false));
    }, []);

    const productosFiltrados = productos.filter((p) => {

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
            {cargando && <p>Cargando productos...</p>}
            {error && <p className="form-message error">{error}</p>}
            <div className="products-grid">
                {productosFiltrados.map((product) => (
                    <ProductCard key={product.id} product={product} onAgregar={agregarAlCarrito} />
                ))}
            </div>
        </div>
      );
}

export default ListarProductos;
