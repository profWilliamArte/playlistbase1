

const Buscador = ({ setSearchTerm }) => {
    return (
        <input 
            type="text" 
            placeholder="Buscar por título o autor" 
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            className="form-control mb-3"
        />
    );
};

export default Buscador;