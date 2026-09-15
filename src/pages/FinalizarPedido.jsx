import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartSummaryItem from '../components/CartSummaryItem/CartSummaryItem';
import FormSection from '../components/FormSection/FormSection';
import FormField from '../components/FormField/FormField';

function FinalizarPedido() {

    const { carrito, precioTotalCarrito, vaciarCarrito } = useCart();

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');
    const [direccion, setDireccion] = useState('');
    const [distrito, setDistrito] = useState('');
    const [referencia, setReferencia] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [nombreTitular, setNombreTitular] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (event) => {

        event.preventDefault();

        if (carrito.length === 0) {
            alert('No hay productos en tu carrito');
            return;
        }
        alert('Pedido finalizado correctamente');
        vaciarCarrito();
        window.location.href = '/';
    };

    return (
        <div className="page-container">
            <h1>Finalizar pedido</h1>
            <div className="checkout-layout">
                <div className="checkout-summary">
                    <h2>Resumen del Carrito</h2>
                    {carrito.length === 0 ? (
                        <p className="cart-empty">No hay productos en el carrito</p>
                    ) : (
                        <>
                            {carrito.map((item) => <CartSummaryItem key={item.id} item={item}/>)}
                            <div className="cart-summary">TOTAL: S/. {precioTotalCarrito.toFixed(2)}</div>
                        </>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="checkout-form-row">
                        <FormSection title="Datos del destinatario">
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
                                id="correo"
                                label="Correo electrónico"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                            <FormField
                                id="celular"
                                label="Celular"
                                type="tel"
                                pattern="[0-9]{9}"
                                title="El celular debe tener 9 números"
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                required
                            />
                        </FormSection>
                        <FormSection title="Dirección de envío">
                            <FormField
                                id="direccion"
                                label="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                            <div className="form-group">
                                <label htmlFor="distrito">Distrito</label>
                                <div className="form-control">
                                    <select
                                        id="distrito"
                                        value={distrito}
                                        onChange={(e) => setDistrito(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona un distrito</option>
                                        <option value="Ancón">Ancón</option>
                                        <option value="Ate">Ate</option>
                                        <option value="Barranco">Barranco</option>
                                        <option value="Breña">Breña</option>
                                        <option value="Carabayllo">Carabayllo</option>
                                        <option value="Chaclacayo">Chaclacayo</option>
                                        <option value="Chorrillos">Chorrillos</option>
                                        <option value="Cieneguilla">Cieneguilla</option>
                                        <option value="Comas">Comas</option>
                                        <option value="El Agustino">El Agustino</option>
                                        <option value="Independencia">Independencia</option>
                                        <option value="Jesús María">Jesús María</option>
                                        <option value="La Molina">La Molina</option>
                                        <option value="La Victoria">La Victoria</option>
                                        <option value="Lima (Cercado de Lima)">Lima (Cercado de Lima)</option>
                                        <option value="Lince">Lince</option>
                                        <option value="Los Olivos">Los Olivos</option>
                                        <option value="Lurigancho-Chosica">Lurigancho-Chosica</option>
                                        <option value="Lurín">Lurín</option>
                                        <option value="Magdalena del Mar">Magdalena del Mar</option>
                                        <option value="Miraflores">Miraflores</option>
                                        <option value="Pachacámac">Pachacámac</option>
                                        <option value="Pucusana">Pucusana</option>
                                        <option value="Pueblo Libre">Pueblo Libre</option>
                                        <option value="Puente Piedra">Puente Piedra</option>
                                        <option value="Punta Hermosa">Punta Hermosa</option>
                                        <option value="Punta Negra">Punta Negra</option>
                                        <option value="Rímac">Rímac</option>
                                        <option value="San Bartolo">San Bartolo</option>
                                        <option value="San Borja">San Borja</option>
                                        <option value="San Isidro">San Isidro</option>
                                        <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
                                        <option value="San Juan de Miraflores">San Juan de Miraflores</option>
                                        <option value="San Luis">San Luis</option>
                                        <option value="San Martín de Porres">San Martín de Porres</option>
                                        <option value="San Miguel">San Miguel</option>
                                        <option value="Santa Anita">Santa Anita</option>
                                        <option value="Santa María del Mar">Santa María del Mar</option>
                                        <option value="Santa Rosa">Santa Rosa</option>
                                        <option value="Santiago de Surco">Santiago de Surco</option>
                                        <option value="Surquillo">Surquillo</option>
                                        <option value="Villa El Salvador">Villa El Salvador</option>
                                        <option value="Villa María del Triunfo">Villa María del Triunfo</option>
                                    </select>
                                </div>
                            </div>
                            <FormField
                                id="referencia"
                                label="Referencia"
                                value={referencia}
                                onChange={(e) => setReferencia(e.target.value)}
                                required
                            />
                        </FormSection>
                    </div>
                    <FormSection title="Método de pago">
                        <FormField
                            id="numero_tarjeta"
                            label="Número de tarjeta"
                            pattern="[0-9]{16}"
                            minLength={16}
                            maxLength={16}
                            title="El número de tarjeta debe tener 16 números"
                            value={numeroTarjeta}
                            onChange={(e) => setNumeroTarjeta(e.target.value)}
                            required
                        />
                        <FormField
                            id="nombre_titular"
                            label="Nombre del titular"
                            value={nombreTitular}
                            onChange={(e) => setNombreTitular(e.target.value)}
                            required
                        />
                        <FormField
                            id="fecha_expiracion"
                            label="Fecha de expiración"
                            type="month"
                            value={fechaExpiracion}
                            onChange={(e) => setFechaExpiracion(e.target.value)}
                            required
                        />
                        <FormField
                            id="cvv"
                            label="CVV"
                            type="password"
                            pattern="[0-9]{3,4}"
                            minLength={3}
                            maxLength={4}
                            title="El CVV debe tener 3 o 4 números"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </FormSection>
                    <button type="submit" className="btn btn-primary btn-block">Finalizar pedido</button>
                </form>
            </div>
        </div>
    );
}

export default FinalizarPedido;
