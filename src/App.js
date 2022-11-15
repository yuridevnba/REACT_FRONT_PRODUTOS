
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
  const[objProdutos,setObjProdutos]=useState(produto);
  

  //UseEffect
useEffect(()=>{
  fetch("http://localhost:8080/listar")
  .then(retorno=>retorno.json())
  .then(retorno_convertido=>setProdutos(retorno_convertido));
},[])// [] garanti que ele vai fazer apenas uma vez essa requisição.

//Obtendo os dados do formulário
const aoDigitar=(e)=>{
  //console.log(e.target);
  setObjProdutos({...objProdutos,[e.target.name]:e.target.value})// o valor que está contendo o objeto produto, código, valor e marca.
}

  //Retorno
  return (
    <div >
     <p>{JSON.stringify(objProdutos)}</p>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} />
      <Tabela  vetor={produtos}/>
    </div>
  );
}

export default App;
