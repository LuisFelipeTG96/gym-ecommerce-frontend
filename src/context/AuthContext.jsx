import { createContext, useState, useEffect, useContext } from 'react';
import { apiFetch } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
        return JSON.parse(localStorage.getItem('usuarioLogueado')) || null;
    });

    useEffect(() => {
        if (usuarioLogueado) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
        } else {
            localStorage.removeItem('usuarioLogueado');
        }
    }, [usuarioLogueado]);

    const iniciarSesion = async (correoInput, passwordInput) => {

        const correo = correoInput.trim().toLowerCase();
        const password = passwordInput.trim();

        if (correo === '' || password === '') {
            return { ok: false, error: 'Debe ingresar correo y contraseña' };
        }

        try {
            const data = await apiFetch('/seguridad/login', {
                method: 'POST',
                body: JSON.stringify({ email: correo, password }),
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);

            let perfil = data.user;
            try {
                perfil = await apiFetch('/seguridad/perfil');
            } catch {
                // si falla, seguimos con los datos basicos que ya trajo el login
            }

            setUsuarioLogueado(perfil);
            window.location.href = '/';
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.data?.error || 'El usuario o la contraseña no son correctos' };
        }
    };

    const crearCuenta = async (datos) => {

        const { nombres, apellidos, documento, idTipoDocumento, correo, password, passwordConfirmation } = datos;

        if (!nombres || !apellidos || !documento || !correo || !password || !passwordConfirmation) {
            return { ok: false, error: 'Todos los campos son obligatorios' };
        }
        if (!correo.includes('@') || !correo.includes('.')) {
            return { ok: false, error: 'Debe ingresar un correo electrónico válido' };
        }
        if (password.length < 6) {
            return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }
        if (password !== passwordConfirmation) {
            return { ok: false, error: 'Las contraseñas no coinciden' };
        }

        try {
            await apiFetch('/seguridad/registro', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: nombres,
                    apellido: apellidos,
                    nro_documento: documento,
                    id_tipodocumento: idTipoDocumento,
                    email: correo.trim().toLowerCase(),
                    password,
                }),
            });
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.data?.error || 'No se pudo crear la cuenta' };
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUsuarioLogueado(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioLogueado, iniciarSesion, crearCuenta, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
