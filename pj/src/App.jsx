
import './App.css';
import './Header.css';
import './footer.css';
import { useState } from 'react';

import Footer from './footer';
import Header from './header';

import location from './assets/location.svg';
import api from './services/api';
function App() {

  const [input, setInput] = useState(''); // [valor, função de atualização
  const [cep, setCep] = useState({});



  async function handleSearch(){

    if(input === ""){
      alert('Digite um cep');
      return;
    }

    try{
      const response = await api.get(`/${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert('Cep não encontrado');
      setInput('');
    }

  }


  return (
   <div className={`container`} >
    
    <Header />
    <main className='conteudo-principal'>
      <div className="image-left">
        <img id='imageLocal' src={location} alt="" />
      </div>
      <div className="container-form">
      <h1>Busca Cep</h1>
        <div className="register">
      
          <input type="text" placeholder='Cep ...' value={input} onChange={ (e) => setInput(e.target.value)}/>;
          <button onClick={handleSearch}>Add</button>;
        </div>
        {Object.keys(cep).length > 0 && (
           <div className="exibe">
           <span>
             <h1 id='cepDigitado'>CEP: {cep.cep}</h1>
             <hr />
           </span>
           <span>
             <h2>Logradouro:{cep.logradouro}</h2>
           </span>
           <span>
             <h2>Bairro: {cep.bairro}</h2>
           </span>
           <span>
             <h2>{cep.localidade} - {cep.uf}</h2>
           </span>
         </div>
        )}
      
      </div>
    </main>
    <Footer />
   </div>
  )
}

export default App
