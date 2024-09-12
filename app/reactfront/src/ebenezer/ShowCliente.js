import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/FormStyles.css';  // Asegúrate de importar el archivo CSS
import SearchCliente from './SearchCliente';

const URI = 'http://localhost:8000/api/clientes';

const CompShowCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientesPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        getClientes();
    }, []);

    const getClientes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URI);
            setClientes(res.data);
            setFilteredClientes(res.data);
        } catch (error) {
            setError('Error al obtener los datos');
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCliente = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
            if (isConfirmed) {
                await axios.delete(`${URI}/${id}`);
                getClientes();
            }
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            setError('Error al eliminar el cliente');
        }
    };

    const handleSearch = (query) => {
        const filtered = clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(query.toLowerCase()) ||
            cliente.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClientes(filtered);
        setCurrentPage(1);
    };

    const indexOfLastCliente = currentPage * clientesPerPage;
    const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
    const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/cliente/create" className='btn btn-primary mt-2 mb-2'>Crear Cliente</Link>
                    <SearchCliente clientes={clientes} onSearch={handleSearch} />
                    
                    {loading && <p>Cargando...</p>}
                    {error && <p className='text-danger'>{error}</p>}
                    
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentClientes.length === 0 ? (
                                <tr>
                                    <td colSpan="7">No hay clientes disponibles</td>
                                </tr>
                            ) : (
                                currentClientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.tipoCliente ? cliente.tipoCliente.descripcion : 'N/A'}</td>
                                        <td>
                                            <Link to={`/cliente/edit/${cliente.id}`} className='btn btn-warning btn-sm mr-2'>Editar</Link>
                                            <button onClick={() => deleteCliente(cliente.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <nav>
                        <ul className='pagination'>
                            {[...Array(totalPages).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number + 1)} className='page-link'>
                                        {number + 1}
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

export default CompShowCliente;
