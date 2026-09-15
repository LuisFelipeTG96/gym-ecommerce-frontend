import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import ListarProductos from './pages/ListarProductos';
import IniciarSesion from './pages/IniciarSesion';
import CrearCuenta from './pages/CrearCuenta';
import Carrito from './pages/Carrito';
import FinalizarPedido from './pages/FinalizarPedido';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ListarProductos />} />
                <Route path="/iniciarSesion" element={<IniciarSesion />}/>
                <Route path="/crearCuenta" element={<CrearCuenta />}/>
                <Route path="/carrito" element={<Carrito />}/>
                <Route path="/finalizarPedido" element={<FinalizarPedido />}/>
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
