//variáveis
const form = document.querySelector("form");
const initalDate = document.querySelector(".initialDate");
const limitDate = document.querySelector(".limitDate");
const descricaoTodo = document.querySelector(".descricaoTodo")
const btnSubmit = document.querySelector(".btnSubmit");
const listaTodos = document.querySelector(".listaTodos");
let todos = [];
let keyLocalStorage = 'info';


let date = new Date()
let today = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
initalDate.value = `${today} / ${month} / ${year}`

//TODO: onload = getitems do local storage //nao ta indo socorro luciano
window.onload=()=>{
    console.log("carregando...")
    carregarInfoLocalStorage();
}
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if(limitDate.value === "" || descricaoTodo.value.length < 10) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");

    let tarefa = {
        descricao: descricaoTodo.value,
        dataLimite:limitDateValor
    }
    todos.push(tarefa);
    let card = `<li class="card">${descricaoTodo.value} ${limitDateValor} <button class="terminar">Terminada</button> <button onclick="excluir()">Excluir</button></li>`;
    listaTodos.innerHTML += card;


    adicionarLocalStorage(tarefa)
    //esvaziando inputs
    limitDate.value = "";
    descricaoTodo.value = "";
})

let adicionarLocalStorage = (obj) => {
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    if(infoLocalStorage !== null){
        todos = JSON.parse(infoLocalStorage)
    }
    todos.push(obj)
    localStorage.setItem(keyLocalStorage,JSON.stringify(todos))
}

let carregarInfoLocalStorage = () => {
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    if(infoLocalStorage !== null){
        todos = JSON.parse(infoLocalStorage)
        console.log(todos)
    }
    let dataToUse =  todos.map((x)=>{
            return `<li class="card">${x.descricao}</li>`
            
        })
        listaTodos.innerHTML+=dataToUse    
}

function excluir(int){
    console.log("clicou excluir")
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    todos = JSON.parse(infoLocalStorage)
    todos.splice(int, 1);
    localStorage.setItem(keyLocalStorage, JSON.stringify(todos));
    
    carregarInfoLocalStorage();
}
    

function terminar(int){
    console.log("clicou terminar")
    terminar.parentElement.style.setProperty("text-decoration","line-through");
}
