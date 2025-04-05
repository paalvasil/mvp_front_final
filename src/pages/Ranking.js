import Menu from "../components/Menu";
import Button from '../components/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from '../components/Modal'; 
import { Link, useNavigate } from "react-router-dom";

export default function Ranking() {

  const [rankingList, setRankingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();


  const loadBeers = () => {
    axios.get('http://127.0.0.1:5000/beers')
      .then(res => {
        const sortedBeers = [...res.data.beers].sort((a, b) => b.note - a.note);
        setRankingList(sortedBeers);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadBeers();
  }, []);

  const handleDeleteClick = (beerName) => {
    const confirmDelete = window.confirm(`Você tem certeza que deseja excluir a cerveja "${beerName}"?`);
    if (confirmDelete) {
      setIsModalOpen(true); 
      deleteItem(beerName);  
    }
  };



  const deleteItem = (item) => {    
    let url = 'http://127.0.0.1:5000/beer?name=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .then(() => {
        loadBeers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleEditClick = (beerName) => {
    navigate(`/edit-beer/${beerName}`);
  }; 


  return (
    <div className="ranking-page">
      <header>   
        <Menu /> 
      </header>
      <section className="ranking-section"> 
        <table className="beer-table">
          <thead>
            <tr>
              <th className="beer-header">Cerveja</th>
              <th className="beer-header">Tipo</th>
              <th className="beer-header">IBU</th>
              <th className="beer-header">Preço</th>
              <th className="beer-header">Avaliação</th>
            </tr>
          </thead>
          <tbody>
            {rankingList.map((beer) => (
              <tr key={beer.id}>
                <td className="beer-cell">{beer.name}</td>
                <td className="beer-cell">{beer.type}</td>
                <td className="beer-cell">{beer.ibu}</td>
                <td className="beer-cell">{beer.value}</td>
                <td className="beer-cell">{beer.note}</td>
                <td className="beer-cell-icon">
                  <svg
                    className="trash-img"
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDeleteClick(beer.name)} 
                  >
                    <path 
                      id="icon"
                      d="M3 20C2.45 20 1.97917 19.7824 1.5875 19.3472C1.19583 18.912 1 18.3889 1 17.7778V3.33333H0V1.11111H5V0H11V1.11111H16V3.33333H15V17.7778C15 18.3889 14.8042 18.912 14.4125 19.3472C14.0208 19.7824 13.55 20 13 20H3ZM13 3.33333H3V17.7778H13V3.33333ZM5 15.5556H7V5.55556H5V15.5556ZM9 15.5556H11V5.55556H9V15.5556Z"
                    />
                  </svg>
                </td>
                <td className="beer-cell-icon">
                <svg
                   className="edit-img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => handleEditClick(beer.name)}
                  >
                    <path d="M12 20h9M16.5 3.5l4 4-12 12H4v-4L16.5 3.5z"/>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>     
        <Link to="/add-beer">
          <Button text="Adicionar Cerveja" id="beer-add-button-form" />
        </Link>
    </section>   
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        title="Cerveja Excluída!"
        message="A cerveja foi excluída com sucesso!"
      />      
      <footer></footer>
    </div>
  ); 
}
