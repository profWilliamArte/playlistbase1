import { useEffect, useState } from "react";

const API = 'http://backplaylist.test/api/cancion/getCancion.php';

const ListadeCanciones = ({ setCancion, genero, autor, filtro, tipoFiltro, agregarTodo, searchTerm }) => {
    const [datos, setDatos] = useState([]);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Inicializar cancionesFiltradas
    let cancionesFiltradas = datos;

    // Filtrar canciones según el filtro y tipo de filtro
    if (tipoFiltro === "autor") {
        cancionesFiltradas = datos.filter(item => item.autor === filtro);
    } else if (tipoFiltro === "genero") {
        cancionesFiltradas = datos.filter(item => item.genero === filtro);
    }

    // Filtrar canciones según el término de búsqueda
    if (searchTerm) {
        cancionesFiltradas = datos.filter(item => 
            item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.autor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div className="text-start row mt-3">
            <p className="text-center">{cancionesFiltradas.length} Canciones encontradas de ({datos.length})</p>
            <button 
                className="btn btn-outline-success mb-3" 
                onClick={() => agregarTodo(cancionesFiltradas)} // Llamar a la función con las canciones filtradas
            >
                Agregar Todas las Canciones
            </button>
            {cancionesFiltradas.map((item) => (
                <div key={item.id} className="col-md-4 mb-3" onClick={() => setCancion(item.genero, item.autor, item.titulo, item.interprete, item.url)}>
                    <div className="card h-100" data-bs-theme="dark">
                        <div className="card-body d-flex align-items-center p-1">
                            <img
                                src={item.coverImage ? item.coverImage : './assets/portadas/generic-image.jpg'}
                                alt={item.name}
                                className="rounded me-3"
                                width={100}
                                height={80}
                            />
                            <div>
                                <p>
                                    {item.autor}<br />
                                    {item.titulo}<br />
                                    {item.genero}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListadeCanciones;