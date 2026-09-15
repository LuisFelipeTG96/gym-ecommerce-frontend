import { createContext, useState, useEffect, useContext } from 'react';

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

    const obtenerUsuarios = () => {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    };

    const guardarUsuarios = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };

    const iniciarSesion = (correoInput, passwordInput) => {

        const correo = correoInput.trim().toLowerCase();
        const password = passwordInput.trim();

        if (correo === '' || password === '') {
            return { ok: false, error: 'Debe ingresar correo y contraseña' };
        }

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.correo === correo && usuario.password === password
        );

        if (usuarioEncontrado === undefined) {
            return { ok: false, error: 'El usuario o la contraseña no son correctos' };
        }

        setUsuarioLogueado({ nombres: usuarioEncontrado.nombres, correo: usuarioEncontrado.correo });
        window.location.href = '/';
        return { ok: true };
    };

    const crearCuenta = (datos) => {

        const { nombres, apellidos, celular, fechaNacimiento, documento, correo, password, passwordConfirmation } = datos;

        if (!nombres || !apellidos || !celular || !fechaNacimiento || !documento || !correo || !password || !passwordConfirmation) {
            return { ok: false, error: 'Todos los campos son obligatorios' };
        }
        if (!correo.includes('@') || !correo.includes('.')) {
            return { ok: false, error: 'Debe ingresar un correo electrónico válido' };
        }
        if (isNaN(Number(celular)) || celular.length < 9) {
            return { ok: false, error: 'El celular debe tener al menos 9 dígitos numéricos' };
        }
        if (isNaN(Number(documento)) || documento.length < 8) {
            return { ok: false, error: 'El documento debe tener al menos 8 dígitos numéricos' };
        }
        if (password.length < 6) {
            return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }
        if (password !== passwordConfirmation) {
            return { ok: false, error: 'Las contraseñas no coinciden' };
        }

        const usuarios = obtenerUsuarios();
        const correoNormalizado = correo.trim().toLowerCase();
        const usuarioExiste = usuarios.find((usuario) => usuario.correo === correoNormalizado);

        if (usuarioExiste !== undefined) {
            return { ok: false, error: 'Ya existe una cuenta con ese correo electrónico' };
        }

        usuarios.push({ nombres, apellidos, celular, fechaNacimiento, documento, correo: correoNormalizado, password });
        guardarUsuarios(usuarios);

        return { ok: true };
    };

    const cerrarSesion = () => {
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
