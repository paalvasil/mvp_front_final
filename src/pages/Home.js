import Menu from "../components/Menu";
import beer from '../assets/beer.png';
import Button from '../components/Button';
import { Link } from "react-router-dom";


export default function Home() {


  return (
    <div className="home-page">
      <header>   
        <Menu /> 
      </header>
      <section className="home-section">
        <img
            className="beer-img"
            src={beer}
            alt="Imagem de uma Cerveja"
        />
        <div className="beer-text">
            Bem-vindo ao Ranking de Cervejas
        </div>
        <div className="beer-add-button-form">         
          <Link to="/add-beer">
            <Button text="Adicionar Cerveja" id="beer-add-button-form" />
          </Link>        
        </div>
      </section>
      <footer></footer>
    </div>
  );
}
