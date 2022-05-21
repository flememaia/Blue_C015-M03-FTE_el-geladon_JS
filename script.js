
// fetch = nativo do js 
// retorna uma Promisse => async/ await // then 
// Recebe 2 argumentos => Primeiro é obrigatório => URL / Segundo => objeto configuração 
// converter .json() => ter os dados de uma forma que o js entenda



const baseUrl = "http://localhost:3000/paletas" // SERVIDOR LOCAL 
// const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas"

// Read ALL
async function findAllPaletas() {

    // const response = await fetch(`${baseUrl}/find-paletas`) // https://el-geladon-backend-by-ip.herokuapp.com/paletas/find-paletas
    const response = await fetch(`${baseUrl}/all-paletas`) // SERVIDOR LOCAL
    
    console.log("response:", response)

    const paletas = await response.json()
    console.log("paletas:", paletas)

    // 1. Selecionar o elemento html que eu quero modificar (seletores)
    // getElementById("paletaList")
    // querySelector("#paletaList")
    // querySelectoAll(PaletaListItem)
    const paletaDivElement = document.getElementById("paletaList")

    // console.log("paletaDivElement", paletaDivElement)

    // *****Exibir apenas uma paleta na tela 
    // paletaDivElement.insertAdjacentHTML("beforeend", 
    //     ` 
    //     <div class="PaletaListaItem">
    //         <div>
    //             <div class="PaletaListaItem__sabor">${paletas[3].sabor}</div>
    //             <div class="PaletaListaItem__preco">R$ ${paletas[3].preco},00</div>
    //             <div class="PaletaListaItem__descricao">${paletas[3].descricao}</div>
    //         </div>
    //         <img class="PaletaListaItem__foto" src=${paletas[3].foto} alt="Paleta de Doce de Leite" />
    //     </div>
    //     `
    //     ) 

    const isEdit = true

    // *****Exibir uma lista 
    paletas.map(function(paleta) {
        console.log("id", paleta._id)
        return document.getElementById("paletaList").insertAdjacentHTML("beforeend", 
        `
        <div class="PaletaListaItem" id="PaletaListaItem_${paleta._id}">
            <div>
                <div id="paletaId" class="PaletaListaItem__id">${paleta._id}</div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
            <div>
                <button onclick="">APAGAR</button> 
                <button onclick="abrirModal(${isEdit})">EDITAR</button> 
            </div>
        </div>
        `
        )
    })
}

findAllPaletas()


async function fetchOnePaleta (id){
    const response = await fetch(`${baseUrl}/one-paleta/${id}`) // SEU SERVIDOR
    const paleta = await response.json()
    console.log("paleta:", paleta)

    return paleta 
}


// Read One
async function findOnePaleta() {
    


    // 1. Selecionar o elemento html que eu quero modificar (seletores)
    const inputElement = document.querySelector("#idPaleta")
    console.log("inputElement", inputElement)

    const id = inputElement.value

    console.log("id", id)

    // const response = await fetch(`${baseUrl}/find-paleta/${id}`) 
    const response = await fetch(`${baseUrl}/one-paleta/${id}`) // SEU SERVIDOR

    
    
    const paleta = await response.json()
    console.log("paleta:", paleta)

    const divPaletaEscolhidaElement = document.getElementById("paletaEscolhida")

    console.log("divPaletaEscolhidaElement", divPaletaEscolhidaElement)

    divPaletaEscolhidaElement.innerHTML = 
        ` 
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de Doce de Leite" />
        </div>
        `
}


//  1. Incluir Botão CADASTRAR no HTML => ao clicar abre o modal => onclick="abreModal()"

// no script.js criar a função abreModal() => display: none => display: flex

const modalElement =  document.querySelector("#overlay")

function abrirModal(isEdit=false){
    const paletaId = document.querySelector("#paletaId").innerText
    console.log(paletaId)

    console.log("isEdit", isEdit)

    modalElement.style.display = "flex"

//  TERNÁRIO = (CONDIÇÃO) ? TRUE : FALSE

    const headerModal = document.querySelector("#header-modal")
    console.log(headerModal)

    // IF/ELSE 
    // if(isEdit){
    //     headerModal.innerText = "Atualizar uma paleta"
    // }else{
    //     headerModal.innerText = "Cadastrar uma paleta"
    // }
   
    isEdit 
        ? headerModal.innerText = "Atualizar uma paleta" // se a resposta for true
        : headerModal.innerText = "Cadastrar uma paleta" // se a resposta for true
}

// 2. MODAL => inputs => style CSS

// js => selescionar os inputs pra conseguir capturar o valor digitado pelo usuário 

// 3. DENTRO DO MODAL => 
    // 3.1 fechar => onclick="fechaModal()" 
function fecharModalCadastro(){
    // js => fechaModal() => display: flex => display: none 
   modalElement.style.display = "none"


}
    // 3.2 CADASTRAR NOVA PALETA => onclick="createPaleta()" 

    // Create 

async function createPaleta() {

// js => createPaleta() => body => o valor digitado pelo usuário
    const sabor =  document.getElementById("sabor").value
    const preco = document.getElementById("preco").value
    const descricao = document.getElementById("descricao").value
    const foto = document.getElementById("foto").value

    const paleta = {sabor, preco, descricao, foto}
    console.log("paleta dentro do create", paleta)

    // + fetch API
    // const response = await fetch(`${baseUrl}/create`, 
    const response = await fetch(`${baseUrl}/create-paleta`, // SERIDOR LOCAL 
        {
            method: "post", // metodo HTTP 
            headers: {"Content-Type": "application/json"}, 
            mode: "cors", 
            body: JSON.stringify(paleta) // o que queremos cadatrar na API             
        }
    ) 
    
    const novaPaleta = await response.json() // verificar o retorno API
    console.log("novaPaleta:", novaPaleta)

    // + fechaModal 
    fecharModalCadastro()
    // chama novamente a rota GET ALL, pra renderizar todas as paletas, inclusive a nova criada. 
    findAllPaletas() 
}

// const id = "628834a8d394cbc6e614c7e1"

async function updatePaleta(id){


    const paletaAntes = await fetchOnePaleta (id)
    console.log("paleta dentro do update antes", paletaAntes)

    const paleta = {...paletaAntes, sabor: "Morango"}

    // const paleta = {sabor: "Doce de Leite", preco: 12, descricao: "Nova descrição", foto: "indisponível" }
    console.log("paleta dentro do update", paleta)

    const response = await fetch(`${baseUrl}/update-paleta/${id}`, // SERIDOR LOCAL 
    {
        method: "put", // metodo HTTP 
        headers: {"Content-Type": "application/json"}, 
        mode: "cors", 
        body: JSON.stringify(paleta) // o que queremos cadatrar na API             
    }) 

    const paletaAntesDaAtualizacao = await response.json() // verificar o retorno API
    console.log("paletaAntesDaAtualizacao:", paletaAntesDaAtualizacao)

    // chama novamente a rota GET ALL, pra renderizar todas as paletas, inclusive a nova criada. 
    // findAllPaletas() 
}

// updatePaleta()

// DELETE

async function deleteOnePaleta (){

    // 1. recuperar o id da paleta a ser deletada 
    // não tem body 
    // method: delete
    // '/delete-paleta/:id' // ROTA SERVIDOR LOCAL 

    const id = "62883cb1d394cbc6e614c80a"

        const response = await fetch(`${baseUrl}/delete-paleta/${id}`, // SERIDOR LOCAL 
    {
        method: "delete", // metodo HTTP 
        headers: {"Content-Type": "application/json"}, 
        mode: "cors", 
    }) 

    const deleteResponse = await response.json() // verificar o retorno API
    console.log("deleteResponse:", deleteResponse)

    // chama novamente a rota GET ALL, pra renderizar todas as paletas, inclusive a nova criada. 
    // findAllPaletas() 

}

deleteOnePaleta ()