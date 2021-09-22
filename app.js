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
let month = date.getMonth();
let year = date.getFullYear();
initalDate.value = `${today} / ${month} / ${year}`

//TODO: onload = getitems do local storage


btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    //TODO: validação dos inputs, length != 0, descricao.length > 10, if error alert("erro"), opcional data limite
    if(limitDate.value == null || descricaoTodo.value.length < 10) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");
    listaTodos.innerHTML += `<div class="card">${descricaoTodo.value} ${limitDateValor} </div>`;

    //TODO: setdata to localstorage aqui, todo todo precisa de um botao delete

    //TODO checkbox -> strikethrough

    //esvaziando inputs
    limitDate.value = "";
    descricaoTodo.value = "";
})

