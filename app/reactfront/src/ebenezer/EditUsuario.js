import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Style/FormStyles.css';  // Importa el archivo CSS

const URI = 'http://localhost:8000/api/usuario/';

const EditUsuario = () => {
    const [nombreComp, setNombreComp] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenha, setContrasenha] = useState('');
    const [confContrasenha, setConfContrasenha] = useState('');
    const [fechaNaci, setFechaNaci] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Para mostrar el mensaje de éxito
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${URI}${id}`);
                const user = response.data;
                setNombreComp(user.nombreComp);
                setEmail(user.email);
                setContrasenha(user.contrasenha);
                setConfContrasenha(user.contrasenha); // Igualamos contrasenha y confContrasenha
                setFechaNaci(user.fechaNaci);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contrasenha !== confContrasenha) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const updatedUser = {
            nombreComp,
            email,
            contrasenha,
            fechaNaci
        };

        try {
            await axios.put(`${URI}${id}`, updatedUser);
            setSuccessMessage("Usuario actualizado con éxito!"); // Mostrar mensaje de éxito
            setTimeout(() => {
                navigate('/usuario/gestion-usuarios'); // Redirigir después de 2 segundos
            }, 2000); // Tiempo antes de redirigir
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error);
        }
    };

    const handleCancel = () => {
        navigate('/usuario/gestion-usuarios'); // Redirige a la tabla de usuarios
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Editar Usuario</h2>
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
                <button type='submit' className='btn btn-primary mt-2'>Actualizar</button>
                <button type='button' onClick={handleCancel} className='btn btn-secondary mt-2 ml-2'>Cancelar</button>
            </form>

            {/* Mostrar mensaje de éxito si la actualización es exitosa */}
            {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
        </div>
    );
};

export default EditUsuario;
