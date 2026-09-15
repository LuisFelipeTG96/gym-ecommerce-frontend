import { useState } from 'react';
import FormField from '../components/FormField/FormField'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function IniciarSesion() {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    const { iniciarSesion } = useAuth();

    const handleSubmit = (event) => {

        event.preventDefault();
        const resultado = iniciarSesion(correo, password);

        if (!resultado.ok) {
            setMensaje({ texto: resultado.error, tipo: 'error' });
        }
    }

    return (

        <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDL63YMTP_904jtahUhJR6czoPCpHBLzq5OyjVSlH7w&s=10" alt="Machamp Supplements Logo" />
            <h1>LOGIN</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <FormField
                    id="correo"
                    label="Correo Electrónico"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <FormField
                    id="password"
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="actions">
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    <Link to="/crearCuenta" className="btn btn-secondary">Crear Cuenta</Link>
                </div>
                <p className={`form-message ${mensaje.tipo}`}>{mensaje.texto}</p>
            </form>
        </div>

    );
}

export default IniciarSesion;
