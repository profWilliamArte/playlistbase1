import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Inicio from "./components/Inicio"


const App = () => {
  return (
    <BrowserRouter>
    <div className="contenedor">
      <Header />

      <main>
        <Inicio/>
      </main>

      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App