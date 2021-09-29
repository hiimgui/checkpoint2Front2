//variáveis
const form = document.querySelector("form");
const initalDate = document.querySelector(".initialDate");
const limitDate = document.querySelector(".limitDate");
const descricaoTodo = document.querySelector(".descricaoTodo")
const btnSubmit = document.querySelector(".btnSubmit");
const listaTodos = document.querySelector(".listaTodos");
const listaRiscada = document.querySelector(".riscado")
let todos = [];
let keyLocalStorage = 'info';

let today = new Date().toLocaleString('pt-BR').substr(0, 10)
// let date = new Date()
// let today = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
initalDate.value = today

//TODO: onload = getitems do local storage //nao ta indo socorro luciano
window.onload=()=>{
    console.log("carregando...")
    carregarInfoLocalStorage();
}
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if(limitDate.value === "" || descricaoTodo.value.length < 10 || today > limitDate.value) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");

    let tarefa = {
        descricao: descricaoTodo.value,
        dataLimite:limitDateValor,
        checked:false,
        id:Date.now()
    }
    todos.push(tarefa);
    adicionarLocalStorage(tarefa)
    carregarInfoLocalStorage()
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
    let dataToUse =  todos.map((x,y)=>{
            return `<li class="card">${x.descricao} ${x.dataLimite}</li>
                   <button class="terminar" onclick="terminar(${y})">Terminar</button>
                   <button onclick="excluir(${y})">Excluir</button> `
            
        })
        listaTodos.innerHTML = ""
        listaTodos.innerHTML+=dataToUse    
}

function excluir(int){
    console.log(int)
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    todos = JSON.parse(infoLocalStorage)
    todos.splice(int, 1);
    localStorage.setItem(keyLocalStorage, JSON.stringify(todos));
    
    carregarInfoLocalStorage();
}


function terminar(y){
    
    let index = y;
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    todos = JSON.parse(infoLocalStorage)
    const li = document.querySelectorAll("li")
    li[index+1].classList.add("riscado")
}

   
