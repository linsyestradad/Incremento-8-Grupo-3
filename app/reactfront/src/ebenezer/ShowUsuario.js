import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/FormStyles.css';  // Asegúrate de importar el archivo CSS
import SearchUsuario from './SearchUsuarios'; // Importar el nuevo componente

const URI = 'http://localhost:8000/api/usuario/';

const CompShowUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Nueva variable para la página actual
    const [usuariosPerPage] = useState(10); // Mostrar 10 usuarios por página

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        try {
            const res = await axios.get(URI);
            setUsuarios(res.data);
            setFilteredUsuarios(res.data); // Inicialmente mostrar todos los usuarios
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const deleteUsuario = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
            if (isConfirmed) {
                await axios.delete(`${URI}${id}`);
                getUsuarios();
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const maskPassword = () => {
        return '**********'; // Puedes ajustar el número de asteriscos aquí si lo deseas
    };

    const handleSearch = (query) => {
        const filtered = usuarios.filter(user =>
            user.nombreComp.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsuarios(filtered);
        setCurrentPage(1); // Reiniciar a la primera página cuando se filtran resultados
    };

    // Calcular los usuarios que deben mostrarse en la página actual
    const indexOfLastUser = currentPage * usuariosPerPage;
    const indexOfFirstUser = indexOfLastUser - usuariosPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredUsuarios.length / usuariosPerPage);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/usuario/create" className='btn btn-primary mt-2 mb-2'>Crear Usuario</Link>
                    <SearchUsuario usuarios={usuarios} onSearch={handleSearch} />
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Email</th>
                                <th>Contraseña</th>
                                <th>Fecha Nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nombreComp}</td>
                                    <td>{usuario.email}</td>
                                    <td>{maskPassword()}</td>
                                    <td>{formatDate(usuario.fechaNaci)}</td>
                                    <td>
                                        <Link to={`/usuario/edit/${usuario.id}`} className="btn btn-warning">Editar</Link>
                                        <button onClick={() => deleteUsuario(usuario.id)} className='btn btn-danger'>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginacion */}
                    <nav className='pagination-center'>
    <ul className='pagination'>
        {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className='page-link'>
                    {index + 1}
                </button>
            </li>
        ))}
    </ul>
</nav>
                </div>
            </div>
        </div>
    );
};

export default CompShowUsuario;
