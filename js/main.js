const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value.toUpperCase())

    // grupo de informaçoes de um único elemento, ou seja um objeto
    const itemAtual = {
        "nome": nome.value.toUpperCase(),
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criaElemento(itemAtual)
        // coloca os objetos no array
        itens.push(itemAtual)
    }

    // o localstorage permite apenas armazenar strings, por isso o uso do metodo stringify
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})


function criaElemento(item) { 
    /*Aqui vamos criar um Elemento para a LI, e mapeamos em uma variavel */
    const novoItem = document.createElement('li')

    /*Agora adicionamos uma classe ao item criado */
    novoItem.classList.add("item")

    /*Agora criamos o Elemento STRONG e mapeamos na variavel*/
    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id

    /*Direcionamos o 'numeroItem' para receber a qtd, usamos o InnerHTML pq a variavel é um html (strong) 
    Fazemos assim pq nao quero que a variavel se torne a qtd e sim RECEBA o valor da qtd*/
    numeroItem.innerHTML = item.quantidade

    /* Usamos o appendChild para colocar a quantidade dentro do novoIten (li) criada  */

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}

