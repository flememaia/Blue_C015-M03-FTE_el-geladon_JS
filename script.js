
// fetch = nativo do js 
// retorna uma Promisse => async/ await // then 
// Recebe 2 argumentos => Primeiro é obrigatório => URL / Segundo => objeto configuração 
// converter .json() => ter os dados de uma forma que o js entenda



const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas"

// Read ALL
async function findAllPaletas() {

    const response = await fetch(`${baseUrl}/find-paletas`) // https://el-geladon-backend-by-ip.herokuapp.com/paletas/find-paletas
    
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

    // *****Exibir a lista 
    // 1. com o FOR
    // for (let i = 0; i<paletas.length; i++){
    //     // console.log(i, paletas[i]['descricao'])

    //     // 2. Alteração que eu quero 
    //         // acrescentar um porçao de código que representa cada card de cada paleta 

    //         // pra inserir uma porção de código, podemos utilizar o insertAdjacentHTML, que recebe 2 argumentos
    //     paletaDivElement.insertAdjacentHTML("beforeend", 
    //     ` 
    //     <div class="PaletaListaItem">
    //         <div>
    //             <div class="PaletaListaItem__sabor">${paletas[i].sabor}</div>
    //             <div class="PaletaListaItem__preco">R$ ${paletas[i].preco},00</div>
    //             <div class="PaletaListaItem__descricao">${paletas[i].descricao}</div>
    //         </div>
    //         <img class="PaletaListaItem__foto" src=${paletas[i].foto} alt="Paleta de Doce de Leite" />
    //     </div>
    //     `
    //     ) 
    // }

    // 2. FOREACH => exemplo apostila // FOROF

    // 3. MAP
    paletas.map(function(batata) {
        return document.getElementById("paletaList").insertAdjacentHTML("beforeend", 
        `
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${batata.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${batata.preco},00</div>
                <div class="PaletaListaItem__descricao">${batata.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${batata.foto} alt="Paleta de ${batata.sabor}" />
        </div>
        `
        )
    })
}

findAllPaletas()

// Read One
async function findOnePaleta() {

    // 1. Selecionar o elemento html que eu quero modificar (seletores)
    const inputElement = document.querySelector("#idPaleta")
    console.log("inputElement", inputElement)

    const id = inputElement.value

    console.log("id", id)

    const response = await fetch(`${baseUrl}/find-paleta/${id}`) 
    
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

function abrirModalCadastro(){
   modalElement.style.display = "flex"
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
    const response = await fetch(`${baseUrl}/create`, 
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



