export default function Tabela({vetor}){
    return(
// cabeçalho da tabela
<table className='table'>

<thead>
<tr>
<th>#</th>
<th>Nome</th>
<th>Marca</th>
<th>Selecionar</th>
</tr>
</thead>

<tbody>
   {
    vetor.map((Obj, indice)=>(

        <tr key={indice}>

        <td>{indice+1}</td>
        <td>{Obj.nome}</td>
        <td>{Obj.marcar}</td>
        <td><button className="btn btn-success">Selecionar</button></td>
        
            </tr>

    ))
   }
</tbody>
</table>

    )
}