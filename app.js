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
let keyLocalStorage = 'info';
document.addEventListener("load", ()=>{
    carregarInfoLocalStorage();
})
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    
    
    //TODO: validação dos inputs, length != 0, descricao.length > 10, if error alert("erro"), opcional data limite
    if(limitDate.value === "" || descricaoTodo.value.length < 10) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");

    //Criar um construtor? que vai ser setado no local storage?
    let tarefa = {
        descricao: descricaoTodo.value,
        dataLimite:limitDateValor
    }
    let card = `<li class="card">${descricaoTodo.value} ${limitDateValor} <button class="terminar">Terminada</button> <button onclick="excluir()">Excluir</button></li>`;
    todos.push(card);
    listaTodos.innerHTML += card;

    // let terminar = document.querySelector(".terminar");
    // terminar.addEventListener("click", (e)=>{
    // e.preventDefault();
    // console.log("clicou")
    // terminar.parentElement.style.setProperty("text-decoration","line-through");

    adicionarLocalStorage(tarefa)
    //esvaziando inputs
    limitDate.value = "";
    descricaoTodo.value = "";
})

// function terminar(){
//     console.log("terminada");
//     descricaoTodo.value.strike();
// }

let adicionarLocalStorage = (obj) => {
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    if(infoLocalStorage !== null){
        todos = JSON.parse(infoLocalStorage)
    }
    todos.push(obj)
    localStorage.setItem(keyLocalStorage,JSON.stringify(todos))
}

let carregarInfoLocalStorage = () => {
    if(infoLocalStorage !== null){
        todos = JSON.parse(infoLocalStorage)
    }
    listaTodos.innerHTML = "";
    todos.forEach((x,y)=> {
        let card = `<li class="card">${info.descricao} ${info.dataLimite} <button class="terminar">Terminada</button> <button>Excluir</button></li>`;
        let terminar = document.querySelector(".terminar").addEventListener("click", (e)=>{
            e.preventDefault();
            console.log("clicou")
            terminar.parentElement.style.setProperty("text-decoration","line-through");
        })
        let excluir = document.querySelector(".excluir").addEventListener("click", ()=>{excluir(y)});
       
    })
}

function excluir(int){

    todos = JSON.parse(infoLocalStorage)
    todos.splice(int, 1);
    localStorage.setItem(keyLocalStorage, JSON.stringify(todos));
    
    carregarInfoLocalStorage();
}
    


