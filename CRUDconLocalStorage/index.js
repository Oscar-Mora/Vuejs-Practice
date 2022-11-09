
//1er paso. Hacemos variables globales, para detectar el formulario y la alerta
//Detectaremos el formulario

const formularioUI = document.querySelector('#formulario');
const actividadesListUI = document.querySelector('#listaActividades');


let arrayActividades = [];

//Funciones
//crear
const createActivity = (actividad) => {
    let item = {
        actividad:actividad,
        estado:false
    }
    arrayActividades.push(item);
    return item;
}
//funcion que guardar e LocalStorage
const guardarDB = ()=> {
    //Aquí guardamos la info para que persiste aun hagamos ctrl+shift+R o F5
    //en localstorage, seteamos el item con key rutina, diciendo que por cada item en arrayActividadeses
    localStorage.setItem( 'rutina', JSON.stringify(arrayActividades));
    //pintamos en el front con drawDB()
    drawDB();
}
//funcion que pinta lo que hay guardado en DB al DOM
const drawDB = () => {
    //limpiamos la lista de actividades
    actividadesListUI.innerHTML = '';
    //despues para pintar partimos de lo que tenemos en la DB
    //se lee el arrayDeActividades de localstorage 'rutina' es el key de como guardamos en localsotrage'
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    //testeamos lo que está trayendo
    // console.log(arrayActividades);
    //Validamos  si está vacío en LCLSTRGE
    if(arrayActividades == null){
        //pintalo vacío
        arrayActividades = [];
    }
    else{
        //Sino pintalo con lo que tenemos el localStorage por cada elemento con stringTemplates
        arrayActividades.forEach(element => {
            //usamos el += porque vamos a ir concatenando las actividades por cada elemento que existe dentro de LocalStorage
            //Antes de pintar al front hacemos una validacion para cambiar el estilo dependiendo el "estado"
            if (element.estado){
                actividadesListUI.innerHTML += ` <div class="alert alert-success" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span class="float-right"><i class="material-symbols-outlined">done</i><i class="material-symbols-outlined">delete</i></span>`
            }
            else{
                actividadesListUI.innerHTML += ` <div class="alert alert-danger" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span class="float-right"><i class="material-symbols-outlined">done</i><i class="material-symbols-outlined">delete</i></span>`
            }
            
        });
    }
}
//funcion eliminar
const eliminarDB = (actividad) => {
    //Aquí vamos a eliminar el item de LocalStorage
    //Se crea la var donde se guardará el index a eliminar
    let indexArray;
    //recorremos los registros en localStorage
    arrayActividades.forEach((element, index)=>{
        //validamos si en la busquedala actividad buscada está en los registros
        // console.log(element.actividad);
        if (element.actividad === actividad){
            //Guardamos  el index en localstorage al index a eliminar
            indexArray=index;
            //testeamos y validamos que estémos obteniendo el index correcto
            // console.log(indexArray);
        }
    });
    //eliminamos del arrayActividadeses el index que tenemos que eliminar, guardado en indexArray 
    arrayActividades.splice(indexArray,1) //el 1 significa cuantos elementos necesito eliminar
    //ahora tenemos que mandar esta accion a localstorage, así que se hace desde guardarDB
    //se ejecuta desde aquí dentro la funcion de guardarDB() que a su vez llama a drawDB()dentro de sí para pintar al front
    guardarDB();
}
//funcion editar
const editarDB= (actividad)=>{
    //Se genera variable que devuelve el index en una comparacion del nombre de la actividad por cada actividad en arrayActividades
    let indexArray = arrayActividades.findIndex( //si usamos la estructura de funcion flecha con las llaves bigote
        // ()=> "{}" Será necesario usar "return" EN CASO CONTRARIO, SOLO ES QUITAR {} Y DEVOLVERÁ EL VALOR EN SÍ 
        (element)=> { return element.actividad === actividad}
    );//VALIDAMOS QUE DEVUELVA EL INDEX
    // console.log(indexArray);
    //AHORA VALIDAMOS QUE NOS DEVUELVA LA ACTIVIDAD COMPLETA DENTRO DEL ARRAY ACTIVIDADES
    // console.log(arrayActividades[indexArray]);
    //cambiamos la propiedad estado a true
    arrayActividades[indexArray].estado=true;
    //pintamos en el frontend con guardardb()
    guardarDB();
}

//ejemplo de input
// let correr = createActivity('correr');
// console.log(correr);
// console.log(arrayActividades);

//EventListenners
//1.-EVENTO PARA GUARDAR Y PERSISTIR ON SUBMIT, ASÍ COMO LIMPIAR EL INPUT
formularioUI.addEventListener ('submit',(e)=>{
    // para que no refresque el sitio
    e.preventDefault();
    //leemos el valor actual del input,para capturarlo
    let actividadUI= document.querySelector('#actividad').value;
    //testeamos que si lo esté capturando
    // console.log(actividadUI);
    //pasamos la captura de datos por la funcion de crear una actividad
    createActivity(actividadUI);
    ///generamos una funcion para guardar-persistir la info
    guardarDB();
    //como ultima parte sería resetear el formulario MUY IMPORTANTE cuando capturamos datos
    formularioUI.reset();
}
)
// 2.-EVENTO PARA DETECTAR EL ITEM QUE QUEREMOS PARA ELIMINARLO
actividadesListUI.addEventListener('click', (e)=>{
    e.preventDefault();
    //cachamos el evento al dar click en el bote de basura para buscar el nodo de la accion a modificar o eliminar
        // console.log(e);
    // validamos que si sea correcto el path de busqueda:
        // console.log(e.srcElement.offsetParent.childNodes[1].innerHTML);
    // Cachamos el texto dentro del tag en el evento
    let ev = e.target.textContent;
    if (ev === 'done' || ev === 'delete') {
        //  Este es el elemento que nos va a permitir eliminar o editar 'texto'
        let texto = e.srcElement.offsetParent.childNodes[1].innerHTML;
        //Accion de eliminar
        if(e.target.innerHTML === "delete"){
            eliminarDB(texto);
        }
        //Accion de editar
        if(ev == 'done'){
            editarDB(texto);
        }
    }
})
//0.- FUNCIONA PARA PINTAR LO QUE TENEMOS EN LOCALSTORAGE
// DOMContentLoaded = Es un evento que se genera cuando el DOM esté cargado
// drawDB -->pinta lo que tenemos el DB
document.addEventListener('DOMContentLoaded',drawDB)