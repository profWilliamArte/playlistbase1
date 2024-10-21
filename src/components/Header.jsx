import { useState } from "react";
import FiltroAutores from "./FiltroAutores";
import FiltroGeneros from "./FiltroGeneros";
import ListadeCanciones from "./ListadeCanciones";
import Reproductor from "./Reproductor";
import Buscador from "./Buscador";

const Header = () => {
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [canciones, setCanciones] = useState([]); // Estado para la lista de canciones
    const [cancionActual, setCancionActual] = useState(null); // Estado para la canción actual
    const [isPlaying, setIsPlaying] = useState(false);
    const [filtro, setFiltro] = useState(""); // Estado para el filtro
    const [tipoFiltro, setTipoFiltro] = useState(""); // Estado para el tipo de filtro

    const handleAutorSelect = (nombre) => {
        setAutor(nombre);
        setFiltro(nombre);
        setTipoFiltro("autor");
    };

    const handleGeneroSelect = (nombre) => {
        setGenero(nombre);
        setFiltro(nombre);
        setTipoFiltro("genero");
    };


    const handleCancionSelect = (genero, autor, titulo, interprete, url) => {
        // Check if the song already exists in the list
        const songExists = canciones.some(song => song.titulo === titulo && song.autor === autor);
    
        if (!songExists) {
            // If the song does not exist, add it to the list
            setCanciones(prev => [...prev, { genero, autor, titulo, interprete, url }]); // Agregar la canción a la lista
            setCancionActual({ genero, autor, titulo, interprete, url }); // Establecer la canción actual
        } else {
            console.log("La canción ya existe en la lista."); // Optional: Log or alert the user
        }
    };

    const agregarTodas = (canciones) => {
        setCanciones(prev => [...prev, ...canciones]); // Agregar todas las canciones a la lista
    };
    return (
        <div className="container text-center">
            <h3 className="pt-3">Play Slist</h3>
            <div className="pt-3 d-flex flex-row flex-wrap justify-content-center">
                <FiltroAutores setAutor={handleAutorSelect} />
            </div>
            <div className="pt-3 d-flex flex-row flex-wrap justify-content-center">
                <FiltroGeneros setGenero={handleGeneroSelect} />
            </div>
            <Buscador/>
            <div className="py-3">
                <Reproductor 
                    canciones={canciones} 
                    setCanciones={setCanciones} // Ensure this is passed
                    setCancionActual={setCancionActual} 
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                />
            </div>
        
            <div>
                <ListadeCanciones 
                    setCancion={handleCancionSelect} 
                    genero={genero} 
                    autor={autor} 
                    filtro={filtro} 
                    tipoFiltro={tipoFiltro} 
                    agregarTodo={agregarTodas}
                />
            </div>
        </div>
    );
};

export default Header;