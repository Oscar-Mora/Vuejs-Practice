const app = new Vue({
    el: '#app',
    data: {
      titulo: 'GYM con Vue!',
      nuevaTarea:'',
      tareas:[]
    },
    methods:{
        agregarTarea(){
      //asignamos con v-model el valor del input(linea 22 del html) a nuevaTarea            
      //validamos que si se esté recibiendo
      //console.log('click', this.nuevaTarea);
          this.tareas.push({
            nombre:this.nuevaTarea,
            estado:false
          });
          //validamos que obtengamos la tarea
          console.log(this.tareas);
          //guardamos en la base de datos localStorage en este caso
          localStorage.setItem('gym-vue',JSON.stringify(this.tareas))
          //limpiamos
          this.nuevaTarea='';

        },
        editarTarea(i){
          //validamos primero que si esté jalando el index correcto, generado en linea 47 del html
          console.log(i);
          //le decimos que en el array ubique el index y cambie el estado de la propiedad
          this.tareas[i].estado =true;
          //guardamos en la base de datos localStorage en este caso los cambios
          localStorage.setItem('gym-vue',JSON.stringify(this.tareas))
        },
        eliminarTarea(i){
          //identificamos el index
          console.log(i)
          //se usa splica para eliminar del listado
          this.tareas.splice(i, 1)
          //guardamos en la base de datos localStorage en este caso la modificacion
          localStorage.setItem('gym-vue',JSON.stringify(this.tareas))
        },
      },
      //creamos el espacio para guardar en localStorage 
      //sobre la funcion created() de las funciones de Vue
    created(){
      //crea el espacio en localstorage con la key gym-vue
      let datosDB = JSON.parse(localStorage.getItem('gym-vue'));
      //validamos que se haya creado, devería retornar = null de primera vez
      // console.log(datosDB);
      if (datosDB == null){
      this.tareas = [];
      } else {
        this.tareas = datosDB;
      }
    }
  })