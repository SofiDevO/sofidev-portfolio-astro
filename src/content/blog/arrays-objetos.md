---
title: "Explorando Arrays y Objetos en JavaScript"
description: "Aprenderemos sobre arrays y objetos  en Javascript así como su implementación"
pubDate: "Jan 29 2024"
heroImage: "/img/img_blog/arrays.webp"
---
**Explorando Arrays y Objetos en JavaScript: Desglose Práctico y Métodos de Recorrido y Modificación**

En esta ocasión veremos que son los arrays y objetos en JavaScript, explorando métodos para acceder a índices, recorrer, y modificar estas estructuras de datos vitales.

![portada](/img/img_blog/arrays.webp)

### **Arrays: Conjuntos Ordenados de Datos**

Si una variable es como una cajita dónde podemos almacenar un valor, el array se podría imaginar como un cofre en el cúal podemos almacenar conjuntos de datos que podemos manipular y explorar. Otra forma de entenderlos es como una canasta llena de frrutras:🍎,🍌,🍓.


#### **Acceder a Elementos y Longitud de un Array**

```javascript
// Crear un array de frutas
const frutas = ['Manzana', 'Banana', 'Fresa'];

// Acceder al primer elemento
console.log(frutas[0]); // Salida: Manzana

// Acceder a la longitud del array
console.log(frutas.length); // Salida: 3
```

En este ejemplo, hemos creado un array de frutas y accedido al primer elemento y a la longitud del array.

#### **Modificar y Añadir Elementos**

```javascript
// Modificar un elemento existente
frutas[1] = 'Uva'; // Ahora, el array es ['Manzana', 'Uva', 'Fresa']

// Añadir un nuevo elemento al final
frutas.push('Piña'); // Ahora, el array es ['Manzana', 'Uva', 'Fresa', 'Piña']
```

Hemos modificado un elemento existente y añadido uno nuevo al final del array utilizando los métodos de acceso y modificación.

#### **Eliminar Elementos**

```javascript
// Eliminar el último elemento
frutas.pop(); // Ahora, el array es ['Manzana', 'Uva', 'Fresa']

// Eliminar el primer elemento
frutas.shift(); // Ahora, el array es ['Uva', 'Fresa']
```

Con `pop` y `shift`, hemos eliminado el último y primer elemento del array, respectivamente.

#### **Método forEach: Explorando cada Elemento del Array**

```javascript
// Utilizar forEach para imprimir cada fruta
frutas.forEach(fruta => {
  console.log(fruta);
});
```

Con `forEach`, hemos recorrido y explorado cada elemento del array, imprimiendo cada fruta.

#### **Método map: Transformar cada Elemento del Array**

```javascript
// Crear un nuevo array con longitudes de cada fruta
const longitudesFrutas = frutas.map(fruta => fruta.length);

console.log(longitudesFrutas); // Salida: [4, 5]
```

Con `map`, hemos creado un nuevo array transformando cada fruta en su longitud.

#### **Método filter: Filtrar Elementos basados en una Condición**

```javascript
// Crear un nuevo array con frutas que tienen más de 3 letras
const frutasLargas = frutas.filter(fruta => fruta.length > 3);

console.log(frutasLargas); // Salida: ['Uva', 'Fresa']
```

Mediante `filter`, hemos obtenido un nuevo array con frutas que tienen más de 3 letras.

### **Objetos: Almacenando Datos con Clave-Valor**

Los objetos en JavaScript nos permiten almacenar datos de manera estructurada utilizando claves únicas.

#### **Acceder a Propiedades y Añadir Nuevas**

```javascript
// Crear un objeto de persona
const persona = {
  nombre: 'Juan',
  edad: 25,
  ciudad: 'Barcelona'
};

// Acceder a la edad
console.log(persona.edad); // Salida: 25

// Añadir una nueva propiedad
persona.trabajo = 'Desarrollador'; // Ahora, el objeto tiene una nueva propiedad
```

Con los objetos, hemos accedido a una propiedad existente y añadido una nueva propiedad al objeto.

#### **Modificar y Eliminar Propiedades**

```javascript
// Modificar el valor de una propiedad existente
persona.edad = 26; // Ahora, la edad es 26

// Eliminar una propiedad
delete persona.ciudad; // Ahora, el objeto no tiene la propiedad "ciudad"
```

Hemos modificado el valor de una propiedad y eliminado otra del objeto utilizando métodos específicos.

#### **Método Object.keys: Obtener las Claves del Objeto**

```javascript
// Obtener las claves del objeto
const clavesPersona = Object.keys(persona);

console.log(clavesPersona); // Salida: ['nombre', 'edad', 'trabajo']
```

Mediante `Object.keys`, hemos obtenido un array con las claves del objeto `persona`.

#### **Método Object.values: Obtener los Valores del Objeto**

```javascript
// Obtener los valores del objeto persona
const valoresPersona = Object.values(persona);

console.log(valoresPersona); // Salida: ['Juan', 26, 'Desarrollador']
```

Con `Object.values`, hemos obtenido un array con los valores del objeto `persona`.

### **Ejercicio Práctico: Aplicando Métodos de Recorrido y Modificación**

Vamos a combinar todos estos conceptos en un ejercicio:

**Ejercicio:** Crea un array de frutas y un objeto de persona. Utiliza al menos tres métodos diferentes para modificar el array y el objeto, como añadir nuevas frutas, cambiar la edad de la persona y eliminar una propiedad del objeto.

```javascript
// Ejercicio: Agrega nuevasFrutas al array de frutas
const frutas = ['Manzana', 'Uva', 'Fresa'];
const nuevasFrutas = ['Kiwi', 'Melocotón'];
  // Tu código aquí: Utiliza métodos como push.





//Edita la edad de Ana, a 31 años
const persona = {
  nombre: 'Ana',
  edad: 30,
  ciudad: 'Madrid'
};

// Tu código aquí:



// Imprimir resultados
console.log('Frutas:', frutas);

console.log('Edad Persona :', persona);

```

Este ejercicio te proporcionará una práctica completa, aplicando métodos tanto en arrays como en objetos. ¡Explora y experimenta con confianza en este emocionante viaje por JavaScript!