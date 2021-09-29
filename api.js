const checked = document.querySelector('.checked')
const notChecked = document.querySelector('.notChecked')
//Usando async e await functions para esperar o request e depois usar no map()
const getTodo = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    if(response.status !== 200){
        throw new Error('cannot fetch')
    }
    const data = await response.json();
    return data
}

getTodo()
   .then(data => data.map((item => {
       if(item.completed){
           checked.innerHTML += `<div class="checked riscado "><span>${item.title}</span></div>`
       } else if (!item.completed){
            notChecked.innerHTML += `<div class="notChecked"><span>${item.title}</span></div>`
       }
    })))
    .catch(err => console.log(err.message))