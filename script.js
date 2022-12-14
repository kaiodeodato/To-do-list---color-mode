var lista = [];
var lista_code = [];
let lista_tarefas = []

console.log(localStorage.page_color)

if(localStorage.page_color){
swapStyleSheet(localStorage.page_color)
}

if(localStorage.salvo){
    let lista_tarefas_temporaria = JSON.parse(localStorage.salvo);
    for(let i = 0; i < lista_tarefas_temporaria.length; i++){
        document.getElementById('input').value = lista_tarefas_temporaria[i]
        gerar()
        }
    }


document.addEventListener('keydown',verificar)
function verificar(e){
    switch(e.key){
        case 'Enter':
            gerar();
            break;
    }
}

function construct(tarefa){
    this.tarefa = tarefa;
    this.code =  `<div class='bloco'>
    <p class='texto_bloco'>${this.tarefa}</p>
    <button class='botao_bloco' onclick="deletar('${this.tarefa}')">Done</button>
    </div>` 
}

function gerar(){
    let input = document.getElementById('input').value;
    if(input != '' && !input.includes('<') && !input.includes('>')){
        lista = [];
        lista_code = [];
        let div_lista = document.getElementById('lista');

        lista_tarefas.push(input);

 
        for(let i = 0; i < lista_tarefas.length;i++){


            let item = new construct(lista_tarefas[i])

            lista.push(item)
            lista_code = lista.map((item => item.code))
            div_lista.innerHTML= lista_code.join('')

            let lista_tarefas_salvas = JSON.stringify(lista_tarefas)
            localStorage.setItem('salvo',lista_tarefas_salvas)
            }
     
    }
    document.getElementById('input').value = ''
}

function deletar(texto){
    let div_lista = document.getElementById('lista');
    let lista_nova = lista.filter(item => item.tarefa != texto)
    lista_tarefas = lista_nova.map((item => item.tarefa))

    lista_tarefas_salvas = JSON.stringify(lista_tarefas)

    localStorage.setItem('salvo',lista_tarefas_salvas)


    if(localStorage.salvo.length == 2){
        
        localStorage.removeItem("salvo");
    }

    lista_code = lista_nova.map(item => item.code)
    div_lista.innerHTML= lista_code.join('')
    lista = [...lista_nova]
}

function limpar(){
    var div_lista = document.getElementById('lista');
    lista = []
    lista_code = []
    lista_tarefas = []

    localStorage.removeItem("salvo");

    div_lista.innerHTML= lista_code

}

function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet); 
}



function change() {

    let estilo = document.getElementById("pagestyle").getAttribute("href")

    if(estilo == "style.css"){
        swapStyleSheet("style2.css")
        localStorage.setItem('page_color',"style2.css")
    }
    if(estilo == "style2.css"){
        swapStyleSheet("style.css")
        localStorage.setItem('page_color',"style.css")
    }
}



// let objeto = {
//     nome: 'kaio' 'deodato',
//     sobrenome: 'deodato',
//     trabalho: 'programador'
// }
// console.log(objeto)

// let objeto_json = JSON.stringify(objeto)

// console.log(objeto_json)

// let objeto2 = JSON.parse(objeto_json);

// console.log(objeto2)