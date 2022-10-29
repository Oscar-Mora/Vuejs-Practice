const { createApp } = Vue;
    
      const vm= createApp({
        data() {
          return {
            img: "https://i.picsum.photos/id/672/200/300.jpg?hmac=jesIP8UU3kCf3sIVWhv1x1qzFDtzqroRy5vY_47ss1I",
            
            name:'photo_subway'
        };
    },
    //v-bind -como es una directuva de Vue, una buena practica sería usarlo dentro de un archivo.js 
    //y no en Tags html directamente. Y mejor aún dentro del template de la aplicacion  quese esté creando.
     template:`<img v-bind:src="img" v-bind>`,
//OTRA FORMA DE USAR v-bind: ES ASÍ -->":"
        
                
          }).mount('#app');
      console.log(vm);