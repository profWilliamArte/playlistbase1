import { useEffect, useState } from 'react';

const Contador = () => {
    const [views, setViews] = useState(0);
    const [activeVisitors, setActiveVisitors] = useState([]);
    const [error, setError] = useState(null);

    const fetchViews = async () => {
        try {
            console.log('Fetching views...');
            const response = await fetch('https://arsistemaweb.com/playlist2/back/util/contador.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setViews(data.views);
        } catch (error) {
            setError('Error al obtener las vistas');
            console.error('Error al obtener las vistas:', error);
        }
    };

    const fetchActiveVisitors = async () => {
        try {
            console.log('Fetching active visitors...');
            const response = await fetch('https://arsistemaweb.com/playlist2/back/util/visitantesActivos.php'); // Asegúrate de que la URL sea correcta
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActiveVisitors(data);
        } catch (error) {
            setError('Error al obtener visitantes activos');
            console.error('Error al obtener visitantes activos:', error);
        }
    };

    useEffect(() => {
        fetchViews();
        fetchActiveVisitors();

        //const intervalId = setInterval(fetchActiveVisitors, 60000); // Cada minuto
       // return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <div className="text-center mt-4">
            <hr/>
            {error ? <p className="text-danger pt-2">{error}</p> : <p className='small'>Número total de visitas: {views}</p>}

            <div className='col-7 mx-auto small'>
                <p>Visitantes Activos en las Últimas 12 Horas:</p>
                <ul className='list-group list-group-flush' data-bs-theme="dark">
                    {activeVisitors.map((visitor, index) => (
                        <li className='list-group-item' key={index}>
                            {visitor.pais} / {visitor.ciudad}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Contador;