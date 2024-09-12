import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/FormStyles.css';  // Importa el archivo CSS

const URI = 'http://localhost:8000/api/usuario/';

const CompCreateUsuario = () => {
    const [nombreComp, setNombreComp] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenha, setContrasenha] = useState('');
    const [confContrasenha, setConfContrasenha] = useState('');
    const [fechaNaci, setFechaNaci] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contrasenha !== confContrasenha) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const newUser = {
            nombreComp,
            email,
            contrasenha,
            fechaNaci
        };

        try {
            await axios.post(URI, newUser);
            setSuccessMessage("Usuario creado con éxito!"); // Mostrar mensaje de éxito
            setTimeout(() => {
                navigate('/usuario/gestion-usuarios'); // Redirigir al módulo Gestión de Usuarios después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    };

    const handleCancel = () => {
        navigate('/usuario/gestion-usuarios'); // Redirigir al módulo Gestión de Usuarios al cancelar
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Crear Usuario</h2>
            
            {/* Mostrar mensaje de éxito si el usuario fue creado */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nombre Completo</label>
                    <input
                        type='text'
                        className='form-control'
                        value={nombreComp}
                        onChange={(e) => setNombreComp(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Contraseña</label>
                    <input
                        type='password'
                        className='form-control'
                        value={contrasenha}
                        onChange={(e) => setContrasenha(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Confirmar Contraseña</label>
                    <input
                        type='password'
                        className='form-control'
                        value={confContrasenha}
                        onChange={(e) => setConfContrasenha(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Fecha de Nacimiento</label>
                    <input
                        type='date'
                        className='form-control'
                        value={fechaNaci}
                        onChange={(e) => setFechaNaci(e.target.value)}
                        required
                    />
                </div>
                <div className='form-buttons'>
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                    <button type='button' className='btn btn-secondary' onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CompCreateUsuario;
