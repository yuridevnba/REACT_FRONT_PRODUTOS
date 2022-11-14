
import './App.css';
import React,{useEffect, useState} from 'react'
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto Produto

  const produto={
  codigo:0,
   nome:'',
   marca:''

  }

  //UseState
  const[btnCadastrar,setBtnCadastrar]=useState(true);
  const[produtos,setProdutos]=useState([]);

  //UseEffect
useEffect(()=>{
  fetch("http://localhost:8080/listar")
  .then(retorno=>retorno.json())
  .then(retorno_convertido=>setProdutos(retorno_convertido));
},[])// [] garanti que ele vai fazer apenas uma vez essa requisição.


  //Retorno
  return (
    <div >
     
      <Formulario botao={btnCadastrar} />
      <Tabela  vetor={produtos}/>
    </div>
  );
}

export default App;
