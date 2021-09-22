//variáveis
const form = document.querySelector("form");
const initalDate = document.querySelector(".initialDate");
const limitDate = document.querySelector(".limitDate");
const descricaoTodo = document.querySelector(".descricaoTodo")
const btnSubmit = document.querySelector(".btnSubmit");
const listaTodos = document.querySelector(".listaTodos");
const todos = [];
let date = new Date()
let today = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
initalDate.value = `${today} / ${month} / ${year}`

//TODO: onload = getitems do local storage


btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    //TODO: validação dos inputs, length != 0, descricao.length > 10, if error alert("erro"), opcional data limite
    if(limitDate.value === "" || descricaoTodo.value.length < 10) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");

    //Criar um construtor? que vai ser setado no local storage?
    let card = `<li class="card">${descricaoTodo.value} ${limitDateValor} <button class="terminar">Terminada</button> <button onclick="excluir()">Excluir</button></li>`;
    todos.push(card);
    listaTodos.innerHTML += card;

    let terminar = document.querySelector(".terminar");
    terminar.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("clicou")
    terminar.parentElement.style.setProperty("text-decoration","line-through");
    });
  
    //TODO checkbox -> strikethrough var result = str.strike();

    //esvaziando inputs
    limitDate.value = "";
    descricaoTodo.value = "";
})

// function terminar(){
//     console.log("terminada");
//     descricaoTodo.value.strike();
// }



function excluir(){
    console.log("excluida")
}

