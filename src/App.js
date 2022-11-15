
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

   //Remover Produto
   const remover = ()=>{
    fetch('http://localhost:8080/remover/'+objProdutos.codigo,{
      method:'delete',
      
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }) 
    .then(retorno=>retorno.json())
    .then(retorno_convertido=>{

     // Mensagem
     alert(retorno_convertido.mensagem);

     // Cópia do vetor de produtos

     let vetorTemp=[...produtos]; // acessar ao código,nome e marca.

     // Ìndice
     let indice=vetorTemp.findIndex((p)=>{
       return p.codigo === objProdutos.codigo;
      // retorna a posição de alguma verificação.
      // posição que foi removida do vetor.
    });

    // Remover produto do vetorTemp

    vetorTemp.splice(indice,1);
    // Atualizar o vetor de produtos
    setProdutos(vetorTemp);

    //Limpar formulário
    limparFormulario();


  })
}


   //Limpar formulário

   const limparFormulario=()=>{
    setObjProdutos(produto); // modelo sempre vai estar limpo.
    setBtnCadastrar(true);
   }

   //Selecionar produto

   const selecionarProduto =(indice)=>{
    setObjProdutos(produtos[indice]);
    setBtnCadastrar(false);

   }

  //Retorno
  return (
    <div >
     
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={Cadastrar}  obj={objProdutos} cancelar={limparFormulario}  remover={remover}/>
      <Tabela  vetor={produtos}  selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
