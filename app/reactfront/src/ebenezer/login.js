import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/FormStyles.css';

const Login = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [contrasenha, setContrasenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, contrasenha });
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log('Token guardado y redirigiendo');
            onLoginSuccess();
            navigate('/');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error de autenticación');
            } else {
                setError('Error de conexión con el servidor');
            }
        }
    };

    const handleRegister = () => {
        navigate('/create');
    };

    return (
        <div className='container'>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
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
                {error && <div className='alert alert-danger mt-2'>{error}</div>}
                <button type='submit' className='btn btn-primary mt-2'>Iniciar Sesión</button>
                <button type='button' className='btn btn-secondary mt-2' onClick={handleRegister}>Registrarse</button>
            </form>
        </div>
    );
};

export default Login;
