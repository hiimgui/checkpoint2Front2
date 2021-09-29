// declarando variáveis
const form = document.querySelector("form");
const initalDate = document.querySelector(".initialDate");
const limitDate = document.querySelector(".limitDate");
const descricaoTodo = document.querySelector(".descricaoTodo")
const btnSubmit = document.querySelector(".btnSubmit");
const listaTodos = document.querySelector(".listaTodos");
let todos = [];
let keyLocalStorage = 'info';

//data para inputs
let newDate = new Date();
let today = newDate.toLocaleString('pt-BR').substr(0, 10);
initalDate.value = today;

//quando a pagina carregar, renderiza as informacoes do local storage
window.onload=()=>{
    console.log("carregando...")
    carregarInfoLocalStorage();
}

//apos apertar submit, validamos os inputs e criamos um objeto que tera os valores dos inputs
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(newDate.value , limitDate.value)
    if(limitDate.value === "" || descricaoTodo.value.length < 10) return alert("error");
    let limitDateValor = limitDate.value.split("-");
    limitDateValor = limitDateValor.reverse();
    limitDateValor = limitDateValor.toString().replace("," , "/");
    limitDateValor = limitDateValor.replace("," , "/");

    let tarefa = {
        descricao: descricaoTodo.value,
        dataLimite:limitDateValor,
    }
    //colocamos o objeto no array declarado no inicio e adicionamos as informacoes no local storage, logo depois, carregamos as informacoes novamente

    todos.push(tarefa);
    adicionarLocalStorage(tarefa)
    carregarInfoLocalStorage()
    //esvaziando inputs
    limitDate.value = "";
    descricaoTodo.value = "";
})

//funcao chamada no submit para abrirar o objeto criado no local storage, logo depois transformamos a informacao em json para abrigar no local storage
let adicionarLocalStorage = (obj) => {
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    if(infoLocalStorage !== null){
        todos = JSON.parse(infoLocalStorage)
    }
    todos.push(obj)
    localStorage.setItem(keyLocalStorage,JSON.stringify(todos))
}

//funcao que renderiza as informacoes localizadas no local storage
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

//funcao chamada quando um clique acontece no botao excluir, tira um objeto do array todos
function excluir(int){
    console.log(int)
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    todos = JSON.parse(infoLocalStorage)
    todos.splice(int, 1);
    localStorage.setItem(keyLocalStorage, JSON.stringify(todos));
    
    carregarInfoLocalStorage();
}

//funcao chamada quando um clique acontece no botao terminar, faz com que fique riscado as informacoes 
function terminar(y){
    
    let index = y;
    let infoLocalStorage = localStorage.getItem(keyLocalStorage);
    todos = JSON.parse(infoLocalStorage)
    const li = document.querySelectorAll("li")
    li[index+1].classList.add("riscado")
}

   
