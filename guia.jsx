Reproductor reproductor import ReactPlayer from 'react-player'; 
const Reproductor = ({ url, autor, genero }) => { 
    return (
    <div className="row"> 
    <div className='col-md-6 mx-auto border p-3 bg-black'> 
        <p>{autor} - {genero}</p> 
        <ReactPlayer url={url} controls={true} width="100%" /> 
    </div> 
    </div>
    ) 
} 
export default Reproductor