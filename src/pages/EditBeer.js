import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function EditBeer() {
  const navigate = useNavigate();
  const { beerName } = useParams(); 
  const [beerType, setBeerType] = useState("");
  const [ibu, setIbu] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/beer?name=${beerName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Cerveja não encontrada");
        }
        return response.json();
      })
      .then(data => {   
        setBeerType(data.type);
        setIbu(data.ibu);
        setPrice(data.value);
        setRating(data.note);
      })
      .catch(error => {
        console.error("Erro ao carregar dados da cerveja", error);
        alert("Erro ao carregar dados da cerveja. Tente novamente.");
      });
  }, [beerName]);

  const resetFormFields = () => {
    setBeerType("");
    setIbu("");
    setPrice("");
    setRating("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ibuValue = ibu ? parseFloat(ibu.toString().replace(',', '.')) : '';
    const priceValue = price ? parseFloat(price.toString().replace(',', '.')) : '';
    const ratingValue = rating ? parseFloat(rating.toString().replace(',', '.')) : '';

    if (!beerName || !rating) {
        alert('Os campos "Cerveja" e "Avaliação" são obrigatórios.');
    } 
    else if (isNaN(ibuValue) || isNaN(priceValue)) {
        alert("IBU e preço precisam ser números!");
    } 
    else if (isNaN(ratingValue) || parseFloat(ratingValue) < 0 || parseFloat(ratingValue) > 10) {
        alert("Avaliação precisa ser um número entre 0 e 10!");
    } 
    else {
        updateBeer(beerName, beerType, ibuValue, priceValue, ratingValue);
    }
  };

  const clearButtonClick = (event) => {
    event.preventDefault();
    resetFormFields();
  };

  const handleModalClose = () => {
    resetFormFields();
    setIsModalOpen(false);
    navigate("/ranking", { replace: true }); 
  };

  const updateBeer = (beerName, beerType, ibu, price, rating) => {

    const formData = new FormData();  
    formData.append('type', beerType);
    formData.append('ibu', ibu);
    formData.append('value', price);
    formData.append('note', rating);
 
  
    fetch(`http://127.0.0.1:5000/beer?name=${beerName}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar a cerveja.");
        }
        return response.json(); 
      })
    .then(() => {
      setIsModalOpen(true);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao atualizar a cerveja. Tente novamente.");
      });
  };

  return (
    <div className="add-beer-page">
      <header>
        <Menu />
      </header>
      <section className="form-container">
        <h1 className="form-title">Editar Cerveja</h1>
        <form action="#" className="form">
          <Input
            label="Cerveja*"
            placeholder="Digite o nome da cerveja"
            value={beerName} //  não pode ser editado
            disabled
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
            <Button text="Salvar" id="add-button" onClick={handleSubmit}/>
            <Button text="Limpar" id="clean-button" onClick={clearButtonClick} />
          </div>
        </form>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Cerveja Editada!"
        message="A cerveja foi editada com sucesso!"
      />
      <footer></footer>
    </div>
  );
}
