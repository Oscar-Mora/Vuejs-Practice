const { createApp } = Vue;
    
      const vm= createApp({
        data() {
          return {
            message: "Esto es un mensaje que se va a meter en un template! y se está imprimiendo",
            name:'Bitcoin'
        };
    },  //LAS DIRECTIVAS SE AGREGAN COMO ATRIBUTOS A LOS TAGS DE HTML
    //v-text es un adirectiva para pasarle argumentos DE textContent de js
    template:`<div v-text="message"> </div>`,
    // jugo:`<div v-text="name"></div>`,
    // template1:`<div v-html="jugo"></div>`
        
                
          }).mount('#app');
      console.log(vm);