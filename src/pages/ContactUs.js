import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Menu from "../components/Menu";
import Button from "../components/Button";
import Input from "../components/Input";  
import Modal from '../components/Modal';  

export default function ContactUs() { 
  const navigate = useNavigate(); 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]); 
  const [cep, setCep] = useState('');
  const [cepErro, setCepErro] = useState(false); 
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

 
  const resetFormFields = () => {
    setName("");
    setEmail("");
    setMessage("");
    setCountry("");    
    setCep("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setEstado("");     
  };

   const addButtonClick = (event) => {

    event.preventDefault(); 

    if (name === "" || email === "" || message === "" || country === "" || (cep === "" && country === 'Brasil')) {
      alert("Todos os campos são obrigatórios!!");
    }
    else {
      setIsModalOpen(true);    
    }    
    
  }; 

    const clearButtonClick = (event) => {
    event.preventDefault(); 
    resetFormFields(); 
  };

  const handleModalClose = () => { 
    resetFormFields();
    setIsModalOpen(false); 
    navigate("/contact-us", { replace: true });
  };

 
  // Carregar países da API Restcountries

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();        
  
        const independentCountries = data.filter((countryData) => countryData.independent);  
 
        setCountries(independentCountries);
        
      } catch (error) {
        console.error('Erro ao carregar países:', error);
      }
    };
    fetchCountries();
  }, []);

  
  // Carregar os dados do CEP
  useEffect(() => {
    const fetchCEP = async (cep) => {
      if (cep.length === 8) { 
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();    
          if (data.erro) {
            setCepErro(true); 
            alert("CEP não encontrado!");
            return;
          } 
          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
          setCepErro(false); 

        } catch (error) {
          console.error('Erro ao carregar cep:', error);
          setCepErro(true);  
        }
      }
    };

    // Remover hífen antes de chamar a API
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetchCEP(cleanCep);
    }
  }, [cep]);


  const formatCep = (value) => {
    // Remove tudo o que não for número
    const cleanedCep = value.replace(/\D/g, '');
    // Formata o CEP visualmente
    if (cleanedCep.length <= 5) {
      return cleanedCep;
    }
    return `${cleanedCep.slice(0, 5)}-${cleanedCep.slice(5, 8)}`;
  };

  const handleCepChange = (e) => {
    let rawValue = e.target.value;
    const formattedCep = formatCep(rawValue);


    if (formattedCep.replace(/\D/g, '').length <= 8) {
      setCep(formattedCep);
    }
  };

  return (
    <div className="contact-us-page">
      <header>
        <Menu /> 
      </header>
      <section className="form-container">
        <h1 className="form-title">Fale Conosco</h1>
        <form action="#" className="form">
           <Input
            label="Nome*"
            placeholder="Preencha seu nome"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <div className="select-country">
            <label className="label" htmlFor="country">País*</label>
            <select className="select-contact-us"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Selecione um país</option>
              {countries.map((countryData) => (
                <option key={countryData.cca3} value={countryData.translations.por.common}>
                  {countryData.translations.por.common}
                </option>
              ))}
            </select>
          </div>
          {country === "Brasil" && (
            <Input
              label="CEP*"
              placeholder="Digite seu cep"
              value={cep} 
              onChange={handleCepChange} 
              maxLength={9}
            />
          )}
            {country === "Brasil" && !cepErro && cep && (
              <>
                <Input
                  label="Logradouro"
                  placeholder="Logradouro"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)} 
                  readonly={true} 
                />
                <Input
                  label="Bairro"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)} 
                  readonly={true} 
                />
                <Input
                  label="Cidade"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)} 
                  readonly={true} 
                />
                <Input
                  label="Estado"
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)} 
                  readonly={true} 
                />
              </>
          )}
    
          <Input
            label="E-mail*"
            type="email"
            placeholder="Informe seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mensagem*"            
            placeholder="Digite sua mensagem"
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          /> 
          <div>  
            <Button text="Enviar" id="add-button" onClick={addButtonClick}/>            
            <Button text="Limpar" id="clean-button" onClick={clearButtonClick}/>           
          </div>
        </form>
      </section>
      <Modal
        isOpen={isModalOpen}         
        onClose={handleModalClose} 
        title="Formulário enviado!"   
        message="Sua mensagem foi cadastrada com sucesso!"          
      />
      <footer></footer>
    </div>
  );
}
