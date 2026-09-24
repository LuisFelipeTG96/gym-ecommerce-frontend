import { Link } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Header() {

    const { usuarioLogueado, cerrarSesion } = useAuth();
    const { carrito } = useCart();
    const totalUnidades = carrito.reduce((total, item) => total + item.cantidad, 0);

    return (
        <header>
            <nav>
                <Link to="/">Inicio</Link>
                {usuarioLogueado ? (
                    <div className="nav-session nav-session-logged">
                        <span className="nav-user">
                            <span className="nav-user-icon"></span>
                            <span>{usuarioLogueado.nombre}</span>
                        </span>
                        <button onClick={cerrarSesion} className="nav-logout">Cerrar Sesión</button>
                    </div>
                ) : (
                    <div className="nav-session">
                        <Link to="/iniciarSesion">Iniciar Sesión</Link>
                        <Link to="/crearCuenta">Crear Cuenta</Link>
                    </div>
                )}
                <Link to="/carrito" className="nav-cart">Carrito ({totalUnidades})</Link>
            </nav>
        </header>
    );
}

export default Header;
