const taskListContainer = document.querySelector('.app__section-task-list')
// formulario
const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')

const textArea = document.querySelector('.app__form-textarea')
const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
//const deletebtn = document.querySelector('.app__form-footer__button--delete')

const taskAtiveDescription = document.querySelector('.app__section-active-task-description')


// criando lista de tarefas
const localStorageTarefas = localStorage.getItem('tarefas')
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas):[]



const taskIconSvg = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" 
    fill="#FFF" />
<path
    d "M9 16.1719119.5938 5.57812121 6.9843819 18.9844L3.42188 13.4062L4.82812 12L19 16.17192"
    fill="#01080E" 
/svg>`

let tarefaSelecionada = null
let itemTarefaSelecionada = null



let tarefaEmEdicao = null
let paragraphEmEdicao = null 



const selecionaTarefa =(tarefa , elemento)=>{
   document.querySelectorAll('.app__section-task-list-item-active')
   .forEach(function (button){
    button.classList.remove('app__section-task-list-item-active')
   })

   if(tarefaSelecionada == tarefa){
    taskAtiveDescription.textContent = null
    itemTarefaSelecionada = null
    tarefaSelecionada = null
    return

   }

   tarefaSelecionada = tarefa
   itemTarefaSelecionada = elemento
   taskAtiveDescription.textContent = tarefa.descricao
   elemento.classList.add('app__section-task-list-item-active')
}



// limpar formulario 

const LimparForm = () => {
    tarefaEmEdicao = null
    paragraphEmEdicao = null
    textArea.value= ''
    formTask.classList.add('hidden')
}

// tarefa para editar 

const selecionaTarefaParaEditar = (tarefa,elemento) =>{
    if(tarefaEmEdicao == tarefa){
        LimparForm()
        return
    }
    formLabel.textContent = 'Editando tarefa'
    tarefaEmEdicao = tarefa
    paragraphEmEdicao = elemento
    textArea.value = tarefa.descricao
    formTask.classList.remove('hidden')
}




function createTask(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item') // adiciono a classe 

    const svgIcon = document.createElement('svg') // caminho elemento svg
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao


    // botao edicao
    const button = document.createElement('button')
    button.classList.add('app_button-edit') // css

    // icone de edicao 
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src','/imagens/edit.png')
    button.appendChild(editIcon)

    button.addEventListener('click',(evento)=>{
    evento.stopPropagation()
    selecionaTarefaParaEditar(tarefa,paragraph)

})

    li.onclick = ()=> {
    selecionaTarefa(tarefa, li)

    }

    svgIcon.addEventListener('click', (event) => {
        event.stopPropagation()
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    })

    if(tarefa.concluida){
        button.setAttribute('disabled',true)
        li.classList.add('app__section-task-list-item-complete')
    }

    // dentro de li adiciono nos filhos as classes
    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}
// iterando o objeto
tarefas.forEach(task =>{
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

// função botao funcionar 
toggleFormTaskBtn.addEventListener('click',() =>{
    formLabel.textContent='Adicionando tarefa'
    
    formTask.classList.toggle('hidden') // alternar a visibilidade
})


const updateLocalStorage =  () =>{
localStorage.setItem('tarefas',JSON.stringify(tarefas))
}

// função para submeter o evento salvar
formTask.addEventListener('submit',(evento)=>{
    evento.preventDefault()
    if(tarefaEmEdicao){
        tarefaEmEdicao.descricao = textArea.value
        paragraphEmEdicao.textContent = textArea.value
    } else { 

    const task = {
        descricao:textArea.value,
        concluida:false
    }

    tarefas.push(task)

    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)

}
    LimparForm()
    updateLocalStorage()

})

// Cancelar
cancelFormTaskBtn.addEventListener('click',() =>{
LimparForm()
    
})

/*localStorage.setItem('quantidade',10)
console.log(localStorage.getItem('quantidade'))*/







