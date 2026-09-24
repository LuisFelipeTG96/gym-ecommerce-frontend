import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField/FormField'

const VALIDACION_DOCUMENTO = {
    1: { pattern: '[0-9]{8}', minLength: 8, maxLength: 8, title: 'El DNI debe tener exactamente 8 números' },
    2: { pattern: '[A-Za-z0-9]{9,15}', minLength: 9, maxLength: 15, title: 'El pasaporte debe tener entre 9 y 15 caracteres alfanuméricos' },
    3: { pattern: '[A-Za-z0-9]{9,12}', minLength: 9, maxLength: 12, title: 'El carnet de extranjería debe tener entre 9 y 12 caracteres alfanuméricos' },
};

function CrearCuenta() {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [celular, setCelular] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [idTipoDocumento, setIdTipoDocumento] = useState(1);
    const [documento, setDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    const { crearCuenta } = useAuth();

    const validacionDocumento = VALIDACION_DOCUMENTO[idTipoDocumento];

    const handleSubmit = async (event) => {

        event.preventDefault();

        const resultado = await crearCuenta({
            nombres, apellidos, celular, fechaNacimiento, documento, idTipoDocumento, correo, password, passwordConfirmation
        });

        if (!resultado.ok) {
            setMensaje({ texto: resultado.error, tipo: 'error' });
            return;
        }

        setMensaje({ texto: 'Cuenta creada correctamente', tipo: 'success' });
        window.location.href = '/iniciarSesion';

    }

    return (
        <div className="card card-wide">
            <div>
                <h1>CREAR CUENTA</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Información Personal</h2>
                    <FormField
                        id="nombres"
                        label="Nombres"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        title="Los nombres solo deben contener letras"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        required
                    />
                    <FormField
                        id="apellidos"
                        label="Apellidos"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        title="Los apellidos solo deben contener letras"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                    <FormField
                        id="celular"
                        label="Celular"
                        pattern="[0-9]{9}"
                        title="El celular solo debe contener 9 números"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        required
                    />
                    <FormField
                        id="fecha_nacimiento"
                        label="Fecha de nacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    />
                    <div className="form-group">
                        <label htmlFor="tipo_documento">Tipo de documento</label>
                        <div className="form-control">
                            <select
                                id="tipo_documento"
                                value={idTipoDocumento}
                                onChange={(e) => {
                                    setIdTipoDocumento(Number(e.target.value));
                                    setDocumento('');
                                }}
                                required
                            >
                                <option value={1}>DNI</option>
                                <option value={2}>Pasaporte</option>
                                <option value={3}>Carnet de Extranjería</option>
                            </select>
                        </div>
                    </div>
                    <FormField
                        id="documento"
                        label="Número de documento"
                        pattern={validacionDocumento.pattern}
                        minLength={validacionDocumento.minLength}
                        maxLength={validacionDocumento.maxLength}
                        title={validacionDocumento.title}
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <hr />
                <div className="form-section">
                    <h2>Información de inicio de sesión</h2>
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
                    <FormField
                        id="password_confirmation"
                        label="Confirmar Contraseña"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    <div className="actions">
                        <button type="submit" className="btn btn-primary btn-block">CREAR CUENTA</button>
                    </div>
                    <p className={`form-message ${mensaje.tipo}`}>{mensaje.texto}</p>
                </div>
            </form>
        </div>
    );
}

export default CrearCuenta;
