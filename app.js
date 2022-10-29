const { createApp } = Vue;
    
      const vm= createApp({
        data() {
          return {
            message: "<p>Esto es un mensaje que se va a meter en un template! y se está imprimiendo sin tocar el HTML pero no renderiza la tag p </p>",
            message1: "<p>Este mensaje se está imprimiendo usando v-html <br> deberíamos ser atentos de no usar NUNCA en inputs que usen los usuarios, como buen practica </p>",
            name:'Bitcoin'
        };
    },  //LAS DIRECTIVAS SE AGREGAN COMO ATRIBUTOS A LOS TAGS DE HTML
    //v-text es un adirectiva para pasarle argumentos DE textContent de js
//<--usando la directiva traemos desde la variable text
     template:`<div v-text="message"> </div>
     <br><div v-once v-text="name"> </div>
     <br><div v-html="message1"> </div>`,//v-once se ocupa para poder renderizar solo una vez el de la primera vez

    // jugo:`<div v-text="name"></div>`,
    // template1:`<div v-html="jugo"></div>`
        
                
          }).mount('#app');
      console.log(vm);