
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
  //console.log(e.target);// o objeto que está executando o evento.
  setObjProdutos({...objProdutos,[e.target.name]:e.target.value})// o valor que está contendo o objeto produto, código, valor e marca.
}
   //Cadastrar Produto
   const Cadastrar = ()=>{
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objProdutos),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }) // requisições do tipo get.
    .then(retorno=>retorno.json()) // promises
    .then(retorno_convertido=>{

      if(retorno_convertido.mensagem!==undefined){
        // se retorno_convertido, tiver msg, erro
        alert(retorno_convertido.mensagem)
      }else{
        setProdutos([...produtos,retorno_convertido]);
        alert('Produto cadastrado com sucesso!')
        limparFormulario()
      }
      //console.log(retorno_convertido);
    })// quando for convertido para um Json
   }
   //Limpar formulário

   const limparFormulario=()=>{
    setObjProdutos(produto); // modelo sempre vai estar limpo.
   }

  //Retorno
  return (
    <div >
     
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={Cadastrar}  obj={objProdutos}/>
      <Tabela  vetor={produtos}/>
    </div>
  );
}

export default App;
