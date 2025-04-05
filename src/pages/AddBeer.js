import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Menu from "../components/Menu";
import Button from "../components/Button";
import Input from "../components/Input";  
import Modal from '../components/Modal';  

export default function AddBeer() { 
  const navigate = useNavigate(); 
  const [beerName, setBeerName] = useState("");
  const [beerType, setBeerType] = useState("");
  const [ibu, setIbu] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const resetFormFields = () => {
    setBeerName("");
    setBeerType("");
    setIbu("");
    setPrice("");
    setRating("");
  };

   const addButtonClick = (event) => {

    event.preventDefault();

    if(!beerName || !rating) {
      alert('Os campos "Cerveja" e "Avaliação" são obrigatórios.');
    }

    else if (isNaN(ibu.replace(',', '.')) || isNaN(price.replace(',', '.'))) {
      alert("IBU e preço precisam ser números!");
    } 

    else if (isNaN(rating.replace(',', '.')) || parseFloat(rating.replace(',', '.')) < 0 || parseFloat(rating.replace(',', '.')) > 10) {
      alert("Avaliação precisa ser um número entre 0 e 10!");
    }

    else {      
      postItem(beerName, beerType, ibu, price, rating)
    }
    
  }; 

    const clearButtonClick = (event) => {
    event.preventDefault(); 
    resetFormFields(); 
  };

  const handleModalClose = () => { 
    resetFormFields();
    setIsModalOpen(false); 
    navigate("/add-beer", { replace: true }); 
  };

  const postItem = async (beerName, beerType, ibu, price, rating) => {
    const formData = new FormData();
    formData.append('name', beerName);
    formData.append('type', beerType);
    formData.append('ibu', ibu);
    formData.append('value', price);
    formData.append('note', rating);
 
    let url = 'http://127.0.0.1:5000/beer';
    return fetch(url, {
      method: 'post',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
          return response.json().then(errorData => {
              throw new Error(errorData.message || 'Erro desconhecido');
          });
      } 
      setIsModalOpen(true); 
      return response.json();
    })
    .catch(error => {     
      alert(error);
    });    
  }
 

  return (
    <div className="add-beer-page">
      <header>
        <Menu /> 
      </header>
      <section className="form-container">
        <h1 className="form-title">Cadastrar nova cerveja</h1>
        <form action="#" className="form">
           <Input
            label="Cerveja*"
            placeholder="Digite o nome da cerveja"
            value={beerName} 
            onChange={(e) => setBeerName(e.target.value)} 
          />
          <Input
            label="Tipo"
            placeholder="Digite o tipo da cerveja: lager, pilsen..."
            value={beerType}
            onChange={(e) => setBeerType(e.target.value)}
          />
          <Input
            label="IBU"            
            placeholder="Digite o IBU"
            value={ibu}
            onChange={(e) => setIbu(e.target.value)}
          />
          <Input
            label="Preço"         
            placeholder="Digite o preço da cerveja"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Avaliação*"          
            placeholder="Dê uma nota de 0 a 10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <div>  
            <Button text="Cadastrar" id="add-button" onClick={addButtonClick}/>            
            <Button text="Limpar" id="clean-button" onClick={clearButtonClick}/>           
          </div>
        </form>
      </section>
      <Modal
        isOpen={isModalOpen}         
        onClose={handleModalClose} 
        title="Cerveja Cadastrada!"   
        message="A cerveja foi cadastrada com sucesso!"          
      />
      <footer></footer>
    </div>
  );
}
