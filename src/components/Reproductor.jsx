import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
const Reproductor = ({ canciones, setCanciones, setCancionActual, isPlaying, setIsPlaying }) => {
    const [index, setIndex] = useState(0);
    const [duration, setDuration] = useState(0); // Duración total de la canción
    const [currentTime, setCurrentTime] = useState(0); // Tiempo actual de la canción

    useEffect(() => {
        if (canciones.length > 0) {
            setCancionActual(canciones[index]);
        }
    }, [index, canciones, setCancionActual]);

    const changeSong = (direction) => {
        if (direction === 'next' && index < canciones.length - 1) {
            setIndex(index + 1);
        } else if (direction === 'prev' && index > 0) {
            setIndex(index - 1);
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds); 
    };

    const handleDuration = (duration) => {
        setDuration(duration); 
    };

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);

    };

    const limpiarLista = () => {
        setCanciones([]); 
        setCancionActual(null); 
        setIsPlaying(false); 
    };

    return (
        <div className="reproductor">
            <div className='row'>
                <div className='col-4 text-start card listadereproduccion' data-bs-theme="dark">
                    <p className='text-center my-2 fw-bold'>Lista de Reproducción ({canciones.length})</p>
                    {canciones && canciones.length > 0 && canciones.map((item, idx) => (
                        <div 
                            key={item.id} 
                            style={{ 
                                backgroundColor: idx === index ? '#f0ad4e' : 'transparent', // Cambia el color de fondo si es la canción actual
                            }}
                        >
                            {item.titulo.toLowerCase()}
                        </div>
                    ))}
                </div>

                <div className='col-8 text-center card' data-bs-theme="dark">
                    <div className='card-body'>
                        <h3>{canciones.length > 0 && canciones[index].autor}</h3>
                        <p>{canciones.length > 0 && canciones[index].genero}</p>
                        <p>{canciones.length > 0 && canciones[index].interprete}</p>
                        <p>{canciones.length > 0 && canciones[index].titulo}</p>
                        {canciones.length > 0 && (
                            <ReactPlayer
                                url={canciones[index].url}
                                playing={isPlaying}
                                onEnded={() => changeSong('next')}
                                onProgress={handleProgress} // Actualiza el tiempo actual
                                onDuration={handleDuration} // Establece la duración total
                                width="0" // Ocultar ancho
                                height="0" // Ocultar altura
                                style={{ display: 'none' }} // Ocultar reproductor
                            />
                        )}
                        <div className="d-flex flex-column align-items-center">
                            <input
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeekChange}
                                className="progress-bar"
                                style={{ width: '80%', margin: '5px 0' }} // Ajusta el ancho y el margen
                            />
                            <div>
                                <button className='btn btn-outline-warning btn-sm' onClick={() => changeSong('prev')}><IoPlaySkipBack /></button>
                                <button className='btn btn-outline-warning btn-sm' onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                                <button className='btn btn-outline-warning btn-sm' onClick={() => changeSong('next')}><IoPlaySkipForward /></button>
                                <button className='btn btn-outline-danger btn-sm' onClick={limpiarLista}>Limpiar Lista</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reproductor;