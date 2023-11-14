
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const IniciarOupausarBt = document.querySelector('#start-pause span') // passando io id e tag que quero alterar
const icone = document.querySelector('.app__card-primary-butto-icon') // classe icon 
const tempoNaTela = document.querySelector('#timer')


let TempoDecorridoSegundos = 1500
let intervaloId = null

const sonPlay = new Audio('/sons/play.wav')
const sonPause = new Audio('/sons/pause.mp3')
const sonFinalizado = new Audio('/sons/beep.mp3')


const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

musicaFocoInput.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})



// código anterior 

/*focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
    imagem.setAttribute('src','/imagens/foco.png') // set atributte muda o elemento que eu quero por outro 2 parametros 
})

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
    imagem.setAttribute('src','/imagens/descanso-curto.png')
})

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto','descanso-longo')
    imagem.setAttribute('src','/imagens/descanso-longo.png')
})*/

// refatorado 
focoBt.addEventListener('click',()=>{
    TempoDecorridoSegundos = 1500
    MudarContexto('foco')
    focoBt.classList.add('active') // adicionando a classe active na minha tag
})
curtoBt.addEventListener('click', () => {
    TempoDecorridoSegundos = 300
   MudarContexto('descanso-curto')
   curtoBt.classList.add('active')
})
longoBt.addEventListener('click', () => {
    TempoDecorridoSegundos = 900
    MudarContexto('descanso-longo')
    longoBt.classList.add('active')
})


function MudarContexto(contexto){
    mostrarTempo()
    botoes.forEach((dados)=>{   // percorrendo minha lista de botoes
        dados.classList.remove('active') // para cada dado eu removo a classe active
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src',`/imagens/${contexto}.png`) 

    switch (contexto) {
        case "foco":
        titulo.innerHTML = ` Otimize sua produtividade , <br>
        <strong class="app__title-strong" >Mergulhe no que importa.</strong>`
         break;

         case "descanso-curto":
         titulo.innerHTML = `
         Que tal dar uma respirada !
         <strong class="app__title-strong" >Faça uma pausa curta.</strong>`
         break;

         case "descanso-longo":
         titulo.innerHTML = `
         Hora de voltar a superficíe.
         <strong class="app__title-strong" >Faça uma pausa longa.</strong>`

         default:
         break;
    }

}

const contagemRegressiva = () =>{
if(TempoDecorridoSegundos <= 0){
    sonFinalizado.play()
    
    zerar()

    
    return 
}
    TempoDecorridoSegundos -= 1
    mostrarTempo()
}


startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloId){ // se intervaloid tiver algum valor a gente pode dar pause
        sonPause.play()
        //alert("tempo finalizado !")
    zerar()
    return 
}
    sonPlay.play()
    intervaloId = setInterval(contagemRegressiva,1000)// dois parametros método a ser executado , tempo de execução
    IniciarOupausarBt.textContent = 'Pausar'
    icone.setAttribute('src','/imagens/pause.png')
}

function zerar(){
    
    clearInterval(intervaloId) // zera o intervalo 
    IniciarOupausarBt.textContent = 'Começar'
    icone.setAttribute('src','/imagens/play_arrow.png')
    intervaloId = null  // volta a ser nulo 
}

function mostrarTempo(){
    const tempo = new Date(TempoDecorridoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute:'2-digit',second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()