import { useEffect, useState } from "react";

const ListadeCanciones = ({ setCancion, genero, autor, filtro, tipoFiltro, agregarTodo, searchTerm, titulo, datos }) => {
    const [cancionesFiltradas, setCancionesFiltradas] = useState([]);

    useEffect(() => {
        // Filtrar las canciones según el tipo de filtro y el término de búsqueda
        let filteredSongs = datos;

        if (tipoFiltro === "autor") {
            filteredSongs = datos.filter(item => item.autor === filtro);
        } else if (tipoFiltro === "genero") {
            filteredSongs = datos.filter(item => item.genero === filtro);
        }

        if (searchTerm) {
            filteredSongs = filteredSongs.filter(item =>
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.interprete.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setCancionesFiltradas(filteredSongs);
    }, [datos, filtro, tipoFiltro, searchTerm]); // Dependencias para actualizar cuando cambien

    return (
        <div className="text-start row mt-3">
            <p className="text-center">
                {cancionesFiltradas.length}
                <span className="fw-bold"> {titulo} </span> de ({datos.length})
            </p>
            <button
                className="btn btn-outline-success mb-3"
                onClick={() => agregarTodo(cancionesFiltradas)} // Llamar a la función con las canciones filtradas
            >
                Agregar Todas las Canciones
            </button>
            {cancionesFiltradas.slice(0, 10).map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4 col-xxl-3 mb-3" onClick={() => setCancion(item.genero, item.autor, item.titulo, item.interprete, item.url, item.coverImage)}>
                    <div className="card h-100 cardCanciones" data-bs-theme="dark">
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
                                    {item.interprete}<br />
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